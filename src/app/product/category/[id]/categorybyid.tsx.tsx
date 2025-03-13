"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FilterBarLeft from "@/components/list-product/filter-bar-left";
import ListProduct from "@/components/list-product/list-product";
import { sendRequest } from "@/utils/api";

const DEFAULT_ITEMS_PER_PAGE = 12;

const CategoryById = () => {
  const params = useParams();
  const idGenre = params?.id || params?.idGenre;

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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreRes = await sendRequest<{ data: IGenre[] }>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
          method: "GET",
        });

        if (genreRes?.data) {
          setGenres(genreRes.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch thể loại:", error);
      }
    };

    fetchGenres();
  }, []);

  const fetchBooks = async (
    selected: string[],
    page: number,
    limit: number,
    sort: string,
    filterParams: { price_min?: number; price_max?: number }
  ) => {
    try {
      const queryParams: Record<string, any> = {
        page,
        limit,
        sort,
        ...filterParams,
      };

      if (selected.length > 0) {
        queryParams.id_genre = selected.join(",");
      }

      const resBookByIdGenre = await sendRequest<{
        data: IModelPaginate<IBook>;
      }>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book`,
        method: "GET",
        queryParams,
      });

      if (resBookByIdGenre?.data?.result) {
        setProducts(resBookByIdGenre.data.result);
        setTotalPages(Math.ceil(resBookByIdGenre.data.meta.total / limit) || 1);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenres, itemsPerPage]);

  useEffect(() => {
    fetchBooks(selectedGenres, currentPage, itemsPerPage, sort, filters);
  }, [selectedGenres, currentPage, itemsPerPage, sort, filters]);

  useEffect(() => {
    if (idGenre) {
      setSelectedGenres(Array.isArray(idGenre) ? idGenre : [idGenre]);
      setCurrentPage(1);
    }
  }, [idGenre]);

  const handleGenreChange = (newSelectedGenres: string[]) => {
    setSelectedGenres(newSelectedGenres);
  };

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setCurrentPage(1);
    setFilters({});
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
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
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
