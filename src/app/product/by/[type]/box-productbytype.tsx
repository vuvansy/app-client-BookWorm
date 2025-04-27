"use client";

import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb, Divider } from "antd";
import { FaBook } from "react-icons/fa";
import { sendRequest } from "@/utils/api";
import ListProductByType from "./list-productbytype";
import CategoryFilter from "./category-filter";
import SortFilter from "./filter-sort";

interface Props {
  initialData: IBook[];
  totalItems: number;
  limit: number;
  genres: IGenre[];
  type: string;
  totalPages: number; 
}

const BoxProductByType = ({
  initialData,
  totalItems,
  limit,
  genres,
  type,
  totalPages: initialTotalPages, 
}: Props) => {
  const [books, setBooks] = useState<IBook[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sort, setSort] = useState<string>("name");
  const [totalItemsByCategory, setTotalItemsByCategory] =
    useState<number>(totalItems);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages); 

  const initialBooksRef = useRef<IBook[]>(initialData);

  useEffect(() => {
    const fetchBooks = async () => {
      if (currentPage === 1 && selectedGenre === "" && sort === "name") {
        setBooks(initialBooksRef.current);
        setTotalItemsByCategory(totalItems);
        setTotalPages(initialTotalPages);
        return;
      }

      try {
        const res = await sendRequest<IBackendRes<IModelPaginate<IBook>>>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${type}`,
          method: "GET",
          queryParams: {
            all: true,
            page: currentPage,
            limit,
            id_genre: selectedGenre || undefined,
            sort,
          },
        });

        setBooks(res?.data?.result || []);
        setTotalItemsByCategory(res?.data?.meta?.total || 0);
        setTotalPages(res?.data?.meta?.pages || 1);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm", error);
      }
    };

    fetchBooks();
  }, [
    currentPage,
    limit,
    selectedGenre,
    sort,
    type,
    initialTotalPages,
    totalItems,
  ]);

  return (
    <div className="bg-bg-main px-2 pb-[1px] xl:px-0">
      <div className="container py-[8px]">
        <Breadcrumb
          items={[
            { title: "Trang Chủ" },
            {
              title: (
                <div className="capitalize">
                  {type === "new"
                    ? "Sản Phẩm Mới Ra Mắt"
                    : type === "flash-sale"
                    ? "Sản Phẩm Flash Sale"
                    : "Sản Phẩm Xu Hướng Mua Sắm"}
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className="container h-auto rounded-lg overflow-hidden mb-5">
        <div className="flex bg-[#FCDDEF] lg:py-4 py-2 pr-4 pl-4">
          <FaBook className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-black">
            {type === "new"
              ? "Sản Phẩm Mới Ra Mắt"
              : type === "flash-sale"
              ? "Sản Phẩm Flash Sale"
              : "Sản Phẩm Xu Hướng Mua Sắm"}
          </p>
        </div>
        <Divider className="!my-0" />
        <CategoryFilter
          genres={genres}
          onCategoryChange={(id_genre) => {
            setSelectedGenre(id_genre);
            setCurrentPage(1);
          }}
        />
        <SortFilter onSortChange={setSort} />
        <ListProductByType
          books={books}
          currentPage={currentPage}
          totalPages={totalPages} 
          totalItems={totalItemsByCategory}
          limit={limit}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BoxProductByType;
