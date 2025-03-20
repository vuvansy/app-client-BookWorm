import React from "react";
import ProductFavorite from "./products-favorite";

const PageWishList = () => {
  return (
    <main className="bg-bg-main pt-5">
      <div className="container bg-white rounded-lg">
        <p className="text-center  text-sub-heading-bold md:py-5 py-3 uppercase">
          Danh Sách Yêu Thích
        </p>
        <ProductFavorite />
      </div>
    </main>
  );
};

export default PageWishList;
