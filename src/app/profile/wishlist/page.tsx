import React from "react";
import ProductFavorite from "./products-favorite";
import { sendRequest } from "@/utils/api";

const pageWishList = async () => {
  const dataBookNew = await sendRequest<IBackendRes<IBook[]>>({
    url: "http://localhost:4000/api/v1/book/new",
    method: "GET",
  });
  return (
    <main className="bg-bg-main pt-5">
      <div className="container bg-white rounded-lg ">
        <p className="text-center md:text-heading3-bold text-sub-heading-bold md:py-5 py-3">
          Danh Sách Yêu Thích
        </p>
        <ProductFavorite dataBookNew={dataBookNew?.data} />
      </div>
    </main>
  );
};
export default pageWishList;
