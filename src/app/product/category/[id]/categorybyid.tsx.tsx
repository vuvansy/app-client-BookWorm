"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilterBarLeft from "@/components/list-product/filter-bar-left";
import ListProduct from "@/components/list-product/list-product";
import { sendRequest } from "@/utils/api";

const DEFAULT_ITEMS_PER_PAGE = 12;

const CategoryById = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const idGenre = params?.id || params?.idGenre;
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [products, setProducts] = useState<IBook[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [sort, setSort] = useState("-createdAt");
  const [filters, setFilters] = useState<{
    price_min?: number;
    price_max?: number;
  }>({});

  const [selectedGenres, setSelectedGenres] = useState<string[]>(() =>
    idGenre ? (Array.isArray(idGenre) ? idGenre : [idGenre]) : []
  );

  // Fetch Authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorRes = await sendRequest<{ data: IAuthor[] }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/author`,
          method: "GET",
        });
        if (authorRes?.data) setAuthors(authorRes.data);
      } catch (error) {
        console.error("Lỗi khi fetch tác giả:", error);
      }
    };
    fetchAuthors();
  }, []);

  // Fetch Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreRes = await sendRequest<{ data: IGenre[] }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
          method: "GET",
        });
        if (genreRes?.data) setGenres(genreRes.data);
      } catch (error) {
        console.error("Lỗi khi fetch thể loại:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch Books
  const fetchBooks = useCallback(async () => {
    try {
      const queryParams: Record<string, any> = {
        page: currentPage,
        limit: itemsPerPage,
        sort,
        ...filters,
      };
      if (selectedGenres.length > 0)
        queryParams.id_genre = selectedGenres.join(",");
      if (selectedAuthors.length > 0)
        queryParams.authors = selectedAuthors.join(",");

      const resBookByIdGenre = await sendRequest<{
        data: IModelPaginate<IBook>;
      }>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book`,
        method: "GET",
        queryParams,
      });

      if (resBookByIdGenre?.data?.result?.length > 0) {
        const books = resBookByIdGenre.data.result;
        const bookReviewsPromises = books.map(async (book) => {
          try {
            const reviewRes = await sendRequest<{ data: { rating: number }[] }>(
              {
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/review/book/${book._id}`,
                method: "GET",
              }
            );
            const ratings = reviewRes.data || [];
            const avgRating =
              ratings.length > 0
                ? ratings.reduce((acc, cur) => acc + cur.rating, 0) /
                  ratings.length
                : 0;

            return { ...book, rating: avgRating };
          } catch (error) {
            console.error(
              `Lỗi khi fetch đánh giá cho sách ${book._id}:`,
              error
            );
            return { ...book, rating: 0 };
          }
        });

        const booksWithRatings = await Promise.all(bookReviewsPromises);
        setProducts(booksWithRatings);
        setTotalPages(
          Math.ceil(resBookByIdGenre.data.meta.total / itemsPerPage) || 1
        );
      } else {
        setProducts([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  }, [
    selectedGenres,
    selectedAuthors,
    currentPage,
    itemsPerPage,
    sort,
    filters,
  ]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenres, selectedAuthors, filters]);

  useEffect(() => {
    if (idGenre) {
      setSelectedGenres(Array.isArray(idGenre) ? idGenre : [idGenre]);
      setCurrentPage(1);
    }
  }, [idGenre]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const authorsFromQuery = params.get("author")?.split(",") || [];
    setSelectedAuthors(authorsFromQuery);
  }, [searchParams]);

  const handleAuthorChange = (newSelectedAuthors: string[]) => {
    setSelectedAuthors(newSelectedAuthors);
    setCurrentPage(1);
  };

  const handleGenreChange = (newSelectedGenres: string[]) => {
    setSelectedGenres(newSelectedGenres);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setSelectedAuthors([]);
    setFilters({});
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters: {
    price_min?: number;
    price_max?: number;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <main className="bg-bg-main">
      <div className="container pt-[20px] flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[24%]">
          <FilterBarLeft
            genres={genres}
            authors={authors}
            selectedGenres={selectedGenres}
            selectedAuthors={selectedAuthors}
            onGenreChange={handleGenreChange}
            onAuthorChange={handleAuthorChange}
            onResetFilters={handleResetFilters}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        <div className="w-full lg:w-[76%]">
          <ListProduct
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            onSortChange={setSort}
          />
        </div>
      </div>
    </main>
  );
};

export default CategoryById;
