"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { FaAngleRight, FaBook } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import ListProductHome from "@/components/list-product/list-product-home";
import ListFlashSale from "@/components/list-flashsale";
import ListCategoryHome from "@/components/list-Category";
import { Spin } from "antd";
import { BiCategory } from "react-icons/bi";

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

  return (
    <>
      {genreLoading ? (
        <div className="bg-white container mb-6 rounded-[10px] hidden md:block">
          <div className="container h-[64px] p-4 flex items-center rounded-t-[10px]">
            <BiCategory className="text-[red] w-[30px] h-[30px] mr-[10px]" />
            <div className="text-sub-heading-bold">Danh mục sản phẩm</div>
          </div>
          <div className="flex container rounded-b-[10px] flex-row justify-between p-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-[120px] flex flex-col items-center">
                <div className="w-full h-[140px] bg-bg-main"></div>
                <p className="mt-2 w-full h-4 bg-bg-main"></p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ListCategoryHome genre={dataGenre?.data} />
      )}
      <div className="bg-bg-sale py-5">
        <div className="container px-4 lg:px-0">
          <div className="w-full flex items-center justify-between rounded-lg lg:px-6 px-4 lg:py-[18px] py-[10px] mb-4 bg-white">
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
        {flsLoading ? (
          <div className="container px-4 lg:px-0">
            <div className="grid grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 bg-gray-200 p-4 rounded shadow-sm w-full"
                >
                  <div className="w-full h-48 bg-gray-300 rounded-xl"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ListFlashSale products={dataFlasSale?.data} />
        )}
      </div>
      <div className="container h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className="flex bg-[#FCDDEF] lg:py-4 py-2 pr-4 pl-4">
          <FaBook className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127] ">
            Sản Phẩm Mới Ra Mắt
          </p>
        </div>
        {bookLoading ? (
          <div className="bg-white overflow-hidden ">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 mt-4 lg:mb-6 mb-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 bg-gray-200 p-4 rounded shadow-sm w-full"
                >
                  <div className="w-full h-48 bg-gray-300 rounded-xl"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:mb-6 mb-4">
              <span className="h-9 w-48 flex justify-center items-center gap-x-2 text-red-500 text-body-bold bg-white border border-red-500 rounded-lg hover:text-white hover:bg-red-500 transition">
                Xem thêm
              </span>
            </div>
          </div>
        ) : (
          <ListProductHome
            dataBooks={dataBookNew?.data}
            link="/product/by/new"
          />
        )}
      </div>

      <div className="container h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className="flex bg-[#FCDDEF] pt-4 pr-4 pl-4 pb-3">
          <FaArrowTrendUp className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127] ">
            Xu Hướng Mua Sắm
          </p>
        </div>
        {bookTrendLoading ? (
          <div className="bg-white overflow-hidden ">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 mt-4 lg:mb-6 mb-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 bg-gray-200 p-4 rounded shadow-sm w-full"
                >
                  <div className="w-full h-48 bg-gray-300 rounded-xl"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:mb-6 mb-4">
              <span className="h-9 w-48 flex justify-center items-center gap-x-2 text-red-500 text-body-bold bg-white border border-red-500 rounded-lg hover:text-white hover:bg-red-500 transition">
                Xem thêm
              </span>
            </div>
          </div>
        ) : (
          <ListProductHome
            dataBooks={dataBookTrend?.data}
            link="/product/by/trending"
          />
        )}
      </div>
    </>
  );
};

export default Home;
