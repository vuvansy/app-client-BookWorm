import React from "react";
import ProductFavorite from "./products-favorite";

export default function page() {
  return (
    <main className="bg-bg-main pt-5">
      <div className="container bg-white rounded-lg ">
        <p className="text-center text-heading3-bold py-5">
          Danh Sách Yêu Thích
        </p>
        <ProductFavorite />
      </div>
    </main>
  );
}
