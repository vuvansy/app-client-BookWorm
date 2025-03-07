import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import NewsBox from "@/components/box-news";
import ListProductHome from "@/components/list-product/list-product-home";
import ListFlashSale from "@/components/list-flashsale";
import { sendRequest } from "@/utils/api";
import ListCategoryHome from "@/components/list-Category";
import CarouselHome from "@/components/carousel";

const Home = async () => {
  const dataFlasSale = await sendRequest<IBackendRes<IBookTable[]>>({
    url: "http://localhost:4000/api/v1/book/flash-sale",
    method: "GET",
  });
  const dataGenre = await sendRequest<IBackendRes<IGenre[]>>({
    url: "http://localhost:4000/api/v1/genre",
    method: "GET",
  });
  const dataBookNew = await sendRequest<IBackendRes<IBook[]>>({
    url: "http://localhost:4000/api/v1/book/new?limit=10",
    method: "GET",
  });
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
  return (
    <main className="bg-bg-main">
      <div className="container py-5 flex lg:justify-between justify-center  ">
        <CarouselHome></CarouselHome>
        <div className="hidden lg:flex lg:flex-col lg:w-[32%] lg:gap-y-[7px]">
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
        <ListProductHome dataBookNew={dataBookNew?.data} />
      </div>
      <div className="container  h-auto rounded-lg overflow-hidden mt-5 mb-5">
        <div className=" flex bg-[#FCDDEF]  pt-4 pr-4 pl-4 pb-3">
          <FaArrowTrendUp className="text-[#C92127] text-[25px] lg:text-[32px]" />
          <p className="ml-2 lg:text-sub-heading-bold text-sub-heading-bold text-[#C92127] ">
            Xu Hướng Mỗi Ngày
          </p>
        </div>
        <ListProductHome dataBookNew={dataBookNew?.data} />
      </div>
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

      <div className="container mt-5 bg-white rounded-lg">
        <p className="lg:text-heading3-bold text-sub-heading-bold lg:mb-5 mb-3 lg:pt-5 pt-3 text-center">
          Tin Tức
        </p>
        <div className="flex gap-[30px] pb-5 px-5 lg:px-0">
          <div className="w-[48%] lg:block hidden">
            <Link href="">
              <Image
                src="/lam-ra-lam-choi-ra-choi-diem-sach-1.jpg"
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
              <p className="text-sub-heading-bold pl-[10px] pt-[15px]">
                “Deep work” và “Shallow work”
              </p>
              <p className="text-caption pl-[10px]">
                Cuốn sách tập trung phân tích hai khái niệm đáng chú ý: “Deep
                work” (những việc đòi hỏi sự tập trung cao độ) và “Shallow work”
                (công việc mang tính lặp, không đòi hỏi nhiều suy nghĩ). Tác giả
                ví “Deep work” như một anh chàng siêu nhân trong nền kinh tế
                ngày càng cạnh tranh hiện nay.
              </p>
            </Link>
          </div>
          <div className="lg:w-[48%] w-full flex flex-wrap gap-2 ">
            <NewsBox />
          </div>
        </div>
      </div>
      <div className="container bg-bg-main mt-5 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {shipper.map((item, index) => (
            <div
              key={index}
              className="rounded bg-white text-center px-4 py-4 sm:px-6 sm:py-5 shadow-md"
            >
              <div className="w-10 h-10 sm:w-[50px] sm:h-[50px] mx-auto">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm sm:text-caption-bold pt-2">{item.title}</p>
              <p className="text-xs sm:text-caption">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
