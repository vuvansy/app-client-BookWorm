"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { FaAngleRight, FaBook } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import NewsBox from "@/components/box-news";
import ListProductHome from "@/components/list-product/list-product-home";
import ListFlashSale from "@/components/list-flashsale";
import ListCategoryHome from "@/components/list-Category";
import CarouselHome from "@/components/carousel";
import { Spin } from "antd";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Home = () => {
  const {
    data: dataFlasSale,
    error: flsError,
    isLoading: flsLoading,
  } = useSWR("http://localhost:4000/api/v1/book/flash-sale", fetcher);

  const {
    data: dataGenre,
    error: genreError,
    isLoading: genreLoading,
  } = useSWR("http://localhost:4000/api/v1/genre", fetcher);

  const {
    data: dataBookNew,
    error: bookError,
    isLoading: bookLoading,
  } = useSWR("http://localhost:4000/api/v1/book/new?limit=10", fetcher);

  const {
    data: dataBookTrend,
    error: bookTrendError,
    isLoading: bookTrendLoading,
  } = useSWR("http://localhost:4000/api/v1/book/trending?limit=10", fetcher);

  if (genreError || bookError || flsError || bookTrendError)
    return <div>Lỗi tải dữ liệu</div>;
  if (genreLoading || bookLoading || flsLoading || bookTrendLoading)
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Spin size="large">
          <span className="">Loading...</span>
        </Spin>
      </div>
    );

  return (
    <>
      <ListCategoryHome genre={dataGenre?.data} />
      <div className="bg-bg-sale py-5">
        <div className="container px-4 lg:px-0">
          <div className=" w-full  flex items-center justify-between  rounded-lg lg:px-6 px-4 lg:py-[18px] py-[10px] mb-4 bg-white">
            <div className="flex items-center">
              <Link href={""} className="">
                <div className="lg:w-[129px] w-[100px] lg:h-[26px] h-[20px] relative">
                  <Image
                    src="/label-flashsale.svg"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </div>
            <div className="">
              <Link href={""}>
                <div className="flex items-center justify-center">
                  <span className="lg:text-caption-bold text-info text-[#1478FC]">
                    Xem tất cả
                  </span>
                  <span className=" text-[#1478FC]">
                    <FaAngleRight className="w-[24px] h-[18px]" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ListFlashSale products={dataFlasSale?.data} />
      </div>
      <div className="container  h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className=" flex bg-[#FCDDEF]  lg:py-4 py-2 pr-4 pl-4">
          <FaBook className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127] ">
            Sản Phẩm Mới Ra Mắt
          </p>
        </div>
        <ListProductHome dataBooks={dataBookNew?.data} link="/product/by/new" />
      </div>
      <div className="container  h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className=" flex bg-[#FCDDEF]  pt-4 pr-4 pl-4 pb-3">
          <FaArrowTrendUp className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127] ">
            Xu Hướng Mua Sắm
          </p>
        </div>
        <ListProductHome
          dataBooks={dataBookTrend?.data}
          link="/product/by/trending"
        />
      </div>
    </>
  );
};

export default Home;
