"use client";
import CarouselPage from "@/components/carousel";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import NewsBox from "@/components/box-news";
import ListProductHome from "@/components/list-product/list-product-home";
import ListFlashSale from "@/components/list-flashsale";
import CategoryPage from "@/components/list-Category";

const products = [
  {
    id: "1",
    image: "/9786044067162.webp",
    name: "Trốn Lên Mái Nhà Để Khóc - Tặng Kèm Bookmark",
    priceNew: 78850,
    priceOld: 95000,
  },
  {
    id: "2",
    image: "/9786044067162.webp",
    name: "Thuật Thao Túng - Góc Tối Ẩn Sau Mỗi Câu Nói",
    priceNew: 97300,
    priceOld: 139000,
  },
  {
    id: "3",
    image: "/books/sachlichsu.webp",
    name: "Ôn Luyện Thi Tốt Nghiệp THPT Từ Năm 2025 - Môn Lịch Sử (Theo Chương Trình GDPT Mới)",
    priceNew: 97300,
    priceOld: 139000,
  },
  {
    id: "4",
    image: "/books/sachngoaingu.jpeg",
    name: "The Angel Next Door Spoils Me Rotten 2",
    priceNew: 201600,
    priceOld: 224000,
  },
  {
    id: "5",
    image: "/books/sachngoaingu.png",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "6",
    image: "/books/sachvanhoa.jpeg",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "7",
    image: "/books/sachvanhoa.png",
    name: "Hoa Học Trò - Số 1451 - Năm 2025 Gọi Tên Những Ngành Học Nào Lên Xu Hướng?",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "8",
    image: "/books/SachYHoc1.png",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "9",
    image: "/9786044067162.webp",
    name: "Hoa Học Trò - Số 1451 - Năm 2025 Gọi Tên Những Ngành Học Nào Lên Xu Hướng?",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "10",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
];

const Home = () => {
  return (
    <main className="bg-bg-main">
      <div className="container pt-5 flex justify-between  ">
        <CarouselPage></CarouselPage>
        <div className="flex w-[32%] h-[100%] gap-y-[7px] flex-wrap items-center justify-between ">
          <div className="w-full max-h-[155px] rounded-lg	">
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
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="w-full max-h-[155px] rounded-lg	">
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
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      <CategoryPage />
      <div className="bg-bg-sale py-5">
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
        {/* <BoxFlashSale products={products} /> */}
        <ListFlashSale products={products} />
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
        <div className="flex gap-[30px] pb-5">
          <div className="w-[48%]">
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
              <p className="text-body-bold pl-[10px] pt-[15px]">
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
          <div className="w-[48%] flex flex-wrap gap-2">
            <NewsBox />
          </div>
        </div>
      </div>
      <div className="container bg-bg-main mt-5">
        <div className="flex justify-between ">
          <div className="w-[300px] rounded-lg bg-white text-center px-[45px] py-[25px]">
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
          <div className="w-[300px] rounded-lg  bg-white text-center px-[45px] py-[25px]">
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
          <div className="w-[300px] rounded-lg  bg-white text-center px-[45px] py-[25px]">
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
          <div className="w-[300px] rounded-lg  bg-white text-center px-[45px] py-[25px]">
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
