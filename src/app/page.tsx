import React from "react";
import Home from "./home";
import CarouselHome from "@/components/carousel";
import Link from "next/link";
import Image from "next/image";
import ListNews from "@/components/listnewshome";

const shipper = [
  {
    img: "/Frame139.png",
    title: "Hàng Hóa Chất Lượng",
    desc: "Tận hưởng các mặt hàng chất lượng hàng đầu với giá cả hợp lý",
  },
  {
    img: "/Frame140.png",
    title: "Hỗ Trợ 24/7",
    desc: "Nhận hỗ trợ ngay lập tức bất cứ khi nào bạn cần",
  },
  {
    img: "/Frame141.png",
    title: "Vận Chuyển Nhanh Chóng",
    desc: "Tùy chọn giao hàng nhanh chóng và đáng tin cậy",
  },
  {
    img: "/Frame142.png",
    title: "Thanh Toán An Toàn",
    desc: "Nhiều phương thức thanh toán an toàn",
  },
];

const page = () => {
  return (
    <main className="bg-bg-main">
      <div className="container py-5 gap-[10px] px-[15px] lg:px-0 flex lg:justify-between justify-center  ">
        <CarouselHome></CarouselHome>
        <div className="hidden lg:flex lg:flex-col lg:w-[32%] lg:gap-y-[10px]">
          <div className="w-full min-h-[155px] rounded-lg overflow-hidden">
            <Link href="">
              <Image
                className="rounded-lg"
                src="/UuDai_T1_392x156.webp"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <div className="w-full min-h-[155px] rounded-lg overflow-hidden">
            <Link href="">
              <Image
                className="rounded-lg"
                src="/ShopeeT1_392x156.webp"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      <Home />
      <div className="container  bg-white rounded-lg overflow-hidden">
        <div className="flex items-center gap-x-3  w-full max-w-full whitespace-nowrap">
          <Link href="">
            <div className="bg-[#FF7507] px-4 md:px-5 py-[5px] md:py-[7px] lg:text-caption-bold text-info-light  text-white rounded-t-lg hover:text-black text-sm md:text-base">
              Sách Tư Duy - Kỹ Năng
            </div>
          </Link>
          <Link href="">
            <div className="px-4 md:px-5 py-[5px] md:py-[7px] text-black lg:text-caption text-info-light hover:text-[#C92127] text-sm md:text-base">
              Sách Tư Duy
            </div>
          </Link>
          <div className="hidden lg:block">|</div>
          <Link href="">
            <div className="hidden md:block px-4 md:px-5 py-[5px] md:py-[7px] text-black lg:text-caption text-info-light hover:text-[#C92127] text-sm md:text-base">
              Sách Kỹ Năng
            </div>
          </Link>
        </div>

        <div className="relative w-full">
          <Link href="">
            <Image
              src="/20240318_22FUnfy4.png"
              alt="Sách Tư Duy - Kỹ Năng"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="w-full"
            />
          </Link>
        </div>
      </div>
        <ListNews />
      <div className="container bg-bg-main mt-5 px-2 lg:px-0 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {shipper.map((item, index) => (
            <div
              key={index}
              className="rounded bg-white text-center px-4 py-4 sm:px-6 sm:py-5 shadow-md"
            >
              <div className="md:w-10 w-8 md:h-10 h-8 sm:w-[50px] sm:h-[50px] mx-auto">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className=" sm:text-caption-bold pt-2">{item.title}</p>
              <p className="text-info sm:text-caption">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
