"use client";

import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BoxProductHome from "./list-product/box-product-home";

interface IProduct {
  id: string;
  image: string;
  name: string;
  priceNew?: number;
  priceOld: number;
}

const products: IProduct[] = [
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
    image: "/9786044067162.webp",
    name: "Một Đời Được Mất",
    priceNew: 97300,
    priceOld: 139000,
  },
  {
    id: "4",
    image: "/9786044067162.webp",
    name: "The Angel Next Door Spoils Me Rotten 2",
    priceNew: 201600,
    priceOld: 224000,
  },
  {
    id: "5",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "6",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "7",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "8",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
    priceNew: 502200,
    priceOld: 558000,
  },
  {
    id: "9",
    image: "/9786044067162.webp",
    name: "The Things You Can See Only When You Slow Down",
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

const BoxFlashSale: React.FC = () => {
  const carouselRef = useRef<any>(null);

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="w-[1260px] pl-[14px]  relative mx-auto">
      <div className="overflow-hidden   mx-auto ">
        <button
          onClick={prevSlide}
          className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <LeftOutlined className="text-xl" />
        </button>

        <Carousel
          ref={carouselRef}
          dots={false}
          slidesToShow={5}
          slidesToScroll={1}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
          ]}
        >
          {products.map((product) => (
            <div key={product.id}>
              <BoxProductHome {...product} />
            </div>
          ))}
        </Carousel>

        {/* Nút bấm bên phải */}
        <button
          onClick={nextSlide}
          className="absolute right-[-7px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <RightOutlined className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default BoxFlashSale;
