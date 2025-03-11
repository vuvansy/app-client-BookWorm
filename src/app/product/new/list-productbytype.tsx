"use client";

import BoxProductHome from "@/components/list-product/box-product-home";
import { Pagination } from "antd";

interface Props {
  books: IBook[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const ListProductByType = ({
  books,
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}: Props) => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 mt-4 lg:mb-6 mb-3">
        {books.map((book, index) => (
          <BoxProductHome key={index} {...book} />
        ))}
      </div>

      <div className="flex justify-center my-4">
        <Pagination
          current={currentPage}
          pageSize={limit} 
          total={totalItems} 
          onChange={onPageChange}
          showSizeChanger={false}
          disabled={totalPages <= 1}
        />
      </div>
    </div>
  );
};

export default ListProductByType;
