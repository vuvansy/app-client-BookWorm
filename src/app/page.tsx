"use client";
import CarouselPage from "@/components/carousel";
import React from "react";
import Image from "next/image";
import CategoryPage from "@/components/list-category";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import BoxFlashSale from "@/components/flash-sale/box-flashsale";
import { FaBook } from "react-icons/fa";
import ListProduct from "@/components/list-product/list-product-home";
import { FaArrowTrendUp } from "react-icons/fa6";
import NewsBox from "@/components/box-news";
import ListProductHome from "@/components/list-product/list-product-home";

const Home = () => {
  return (
    <main className="bg-bg-main">
      <div className="container py-5 flex justify-between  ">
        <CarouselPage></CarouselPage>
        <div className="flex w-[392px] h-[100%] flex-wrap items-center justify-between ">
          <div className="w-full h-[155px] mb-[4px] rounded-lg	">
            <Link href="">
              {" "}
              <Image
                className="rounded-lg"
                src="/UuDai_T1_392x156.webp"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="w-full h-[155px] mt-[4px] rounded-lg	">
            <Link href="">
              {" "}
              <Image
                className="rounded-lg"
                src="/ShopeeT1_392x156.webp"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      <CategoryPage />
      <div className="bg-bg-sale pt-5 mt-5 h-[480px] w-[100%]">
        <div className="container  flex items-center justify-between  rounded-lg px-6 py-[18px] mb-4 bg-white">
          <div className="flex items-center">
            <Link href={""} className="">
              <div className="w-[129px] h-[26px] relative">
                <Image
                  src="/label-flashsale.svg"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="mt-[2px] ml-4 text-body1">Kết thúc trong</div>
            <div className="ml-2">
              <span className="px-[6px] py-[4px] bg-black text-white text-body-bold rounded-lg ">
                00
              </span>
              <span className="px-[2px] text-info-bold">:</span>
              <span className="px-[6px] py-[4px] bg-black text-white text-body-bold rounded-lg ">
                00
              </span>
              <span className="px-[2px] text-info-bold">:</span>
              <span className="px-[6px] py-[4px] bg-black text-white text-body-bold rounded-lg ">
                00
              </span>
            </div>
          </div>
          <div>
            <Link href={""}>
              <div className="flex items-center justify-center">
                <span className="text-caption-bold text-[#1478FC]">
                  Xem tất cả
                </span>
                <span className=" text-[#1478FC]">
                  <FaAngleRight className="w-[24px] h-[18px]" />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <BoxFlashSale />
      </div>
      <div className="container  h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className=" flex bg-[#FCDDEF]  pt-4 pr-4 pl-4 pb-3">
          <FaBook color="#C92127" size="32px" />
          <p className="ml-2 text-[20px] text-[#C92127] font-bold">
            Sản Phẩm Mới Ra Mắt
          </p>
        </div>
        <ListProductHome />
      </div>
      <div className="container  h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className=" flex bg-[#FCDDEF]  pt-4 pr-4 pl-4 pb-3">
          <FaArrowTrendUp color="#C92127" size="32px" />
          <p className="ml-2 text-[20px] text-[#C92127] font-bold">
            Xu Hướng Mỗi Ngày
          </p>
        </div>
        <ListProductHome />
      </div>
      <div className="container bg-white rounded-lg overflow-hidden">
        <div className=" flex items-center">
          <Link href="">
            <div className="bg-[#FF7507] px-5 py-[7px] text-caption-bold text-white rounded-t-lg hover:text-black  ">
              Sách Tư Duy - Kỹ Năng
            </div>
          </Link>
          <Link href="">
            <div className=" px-5 py-[7px] text-black  text-caption hover:text-[#C92127] ">
              Sách Tư Duy
            </div>
          </Link>
          <div>|</div>
          <Link href="">
            <div className=" px-5 py-[7px] text-black text-caption hover:text-[#C92127] ">
              Sách Kỹ Năng
            </div>
          </Link>
        </div>
        <div className="">
          <div className="relative">
            <Link href="">
              <Image
                src="/20240318_22FUnfy4.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-5 bg-white rounded-lg">
        <p className="text-heading3-bold mb-5 pt-5 text-center">Tin Tức</p>
        <div className="flex pb-5">
          <div className="w-1/2">
            <Link href="">
              <Image
                src="/17358167219431528_512.webp"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              />
              <p className="text-body-bold pl-[10px] pt-[15px]">
                Mừng Giáng sinh - Mua Sắm Trúng Thưởng - Rinh Quà Miễn Phí
              </p>
              <p className="text-caption pl-[10px]">
                Giáng sinh gõ cửa - Siêu Game “Mua Sắm Trúng Thưởng – Rinh Quà
                Miễn Phí” được chờ đón nhất chính thức bắt đầu. Duy nhất 17 –
                25/12{" "}
              </p>
            </Link>
          </div>
          <div className="w-1/2 pl-5 flex flex-wrap gap-5">
            <NewsBox />
            <NewsBox />
            <NewsBox />
            <NewsBox />
          </div>
        </div>
      </div>
      <div className="container bg-white mt-5">
        <div className="flex ">
          <div className="w-1/4 text-center px-[50px] py-[25px]">
            <div className="w-[50px] h-[50px] mx-auto">
              <Image
                src="/Frame139.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              />
            </div>
            <p className="text-caption-bold pt-[10px]">Hàng Hóa Chất Lượng</p>
            <p className="text-caption">
              Tận hưởng các mặt hàng chất lượng hàng đầu với giá cả hợp lý
            </p>
          </div>
          <div className="w-1/4 text-center px-[50px] py-[25px]">
            <div className="w-[50px] h-[50px] mx-auto">
              <Image
                src="/Frame140.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              />
            </div>
            <p className="text-caption-bold pt-[10px]">Hỗ Trợ 24/7</p>
            <p className="text-caption">
              Nhận hỗ trợ ngay lập tức bất cứ khi nào bạn cần
            </p>
          </div>
          <div className="w-1/4 text-center px-[50px] py-[25px]">
            <div className="w-[50px] h-[50px] mx-auto">
              <Image
                src="/Frame141.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              />
            </div>
            <p className="text-caption-bold pt-[10px]">
              Vận Chuyển Nhanh Chóng
            </p>
            <p className="text-caption">
              Tùy chọn giao hàng nhanh chóng và đáng tin cậy
            </p>
          </div>
          <div className="w-1/4 text-center px-[50px] py-[25px]">
            <div className="w-[50px] h-[50px] mx-auto">
              <Image
                src="/Frame142.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                className="w-full"
              />
            </div>
            <p className="text-caption-bold pt-[10px]">Thanh Toán An Toàn</p>
            <p className="text-caption">Nhiều phương thức thanh toán an toàn</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
