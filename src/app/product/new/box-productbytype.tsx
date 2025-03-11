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
}

const BoxProductByType = ({
  initialData,
  totalItems,
  limit,
  genres,
}: Props) => {
  const [books, setBooks] = useState<IBook[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / limit);
  const initialBooksRef = useRef<IBook[]>(initialData);

  useEffect(() => {
    const fetchBooks = async () => {
      if (currentPage === 1) {
        setBooks(initialBooksRef.current);
        return;
      }

      try {
        const res = await sendRequest<IModelPaginate<IBook>>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/new`,
          method: "GET",
          queryParams: { all: true, page: currentPage, limit },
        });

        setBooks(res?.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm", error);
      }
    };

    fetchBooks();
  }, [currentPage, limit]);

  return (
    <div className="bg-bg-main px-2 pb-[1px] xl:px-0">
      <div className="container py-[8px]">
        <Breadcrumb
          items={[
            { title: "Trang Chủ" },
            { title: <div className="capitalize">Sản Phẩm Mới Ra Mắt</div> },
          ]}
        />
      </div>

      <div className="container h-auto rounded-lg overflow-hidden mb-5">
        <div className="flex bg-[#FCDDEF] lg:py-4 py-2 pr-4 pl-4">
          <FaBook className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127]">
            Sản Phẩm Mới Ra Mắt
          </p>
        </div>
        <Divider className="!my-0" />
        <CategoryFilter genres={genres} />
        <SortFilter  />
        <ListProductByType
          books={books}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BoxProductByType;
