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
interface FlashSaleCarouselProps {
  products: IProduct[];
}
const BoxFlashSale: React.FC<FlashSaleCarouselProps> = ({ products }) => {
  const carouselRef = useRef<any>(null);

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="w-[1260px] pl-[14px]  relative mx-auto">
      <div className="overflow-hidden mx-auto ">
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
