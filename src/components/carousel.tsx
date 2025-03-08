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
    <div className="w-full max-w-[840px] px-2 sm:px-4">
      <div className="relative">
        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute hidden left-0 sm:left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] 
          lg:flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-200"
        >
          <LeftOutlined className="text-xl" />
        </button>

        <Carousel ref={carouselRef} className="custom-carousel">
          {imageCarousel.map((item) => (
            <div key={item.id} className="relative w-full">
              <div className="relative w-full">
                <Image
                  src={item.image}
                  alt="Slide image"
                  width={840}
                  height={320}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  className="w-full h-auto object-contain lg:rounded-lg rounded"
                />
              </div>
            </div>
          ))}
        </Carousel>

        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute hidden  right-0 sm:right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] 
          lg:flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-200"
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
