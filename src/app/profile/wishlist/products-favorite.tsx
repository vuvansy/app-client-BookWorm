"use client";
import BoxProduct from "@/components/list-product/box-product";
import { Pagination } from "antd";
import React, { useState } from "react";

interface Props {
  dataBookNew?: IBook[];
}

const ProductFavorite = ({ dataBookNew = [] }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataBookNew.slice(startIndex, endIndex);

  return (
    <div className="bg-white overflow-hidden pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-4 mb-6">
        {currentData.map((book, index) => (
          <BoxProduct key={index} {...book} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataBookNew.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ProductFavorite;
