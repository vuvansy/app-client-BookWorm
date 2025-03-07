"use client";
import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const imageCarousel = [
  { id: 1, image: "/snapedit_1740666376597.jpg" },
  { id: 2, image: "/snapedit_1740666483358.jpg" },
  { id: 3, image: "/snapedit_1740666529015.jpg" },
];

const CarouselHome: React.FC = () => {
  const carouselRef = useRef<any>(null);

  return (
    <div className="w-full lg:w-[67%] max-w-[840px] px-4 md:px-0">
      <div className="relative">
        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] 
          lg:flex hidden items-center justify-center rounded-full hover:bg-gray-200"
        >
          <LeftOutlined className="text-xl" />
        </button>
        <Carousel ref={carouselRef} className="custom-carousel">
          {imageCarousel.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-[200px] md:h-[280px] lg:h-[320px]"
            >
              <Image
                src={item.image}
                alt="Slide image"
                fill
                className="object-contain lg:rounded-lg rounded"
                priority
              />
            </div>
          ))}
        </Carousel>

        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] 
          lg:flex hidden items-center justify-center rounded-full hover:bg-gray-200"
        >
          <RightOutlined className="text-xl" />
        </button>
        <style jsx global>{`
          .custom-carousel .slick-list {
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          @media (max-width: 1024px) {
            .custom-carousel .slick-list {
              border-radius: 4px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CarouselHome;
