"use client";
import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const images = [
  "/snapedit_1740666376597.jpg",
  "/snapedit_1740666483358.jpg",
  "/snapedit_1740666529015.jpg",
];

const CarouselHome: React.FC = () => {
  const carouselRef = useRef<any>(null);

  return (
    <div className="w-full max-w-[840px] relative">
      <Carousel ref={carouselRef} className="custom-carousel">
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt="Slide image"
              width={840}
              height={320}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      <button
        onClick={() => carouselRef.current?.prev()}
        className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-8 h-8 hidden lg:flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
      >
        <LeftOutlined className="text-xl" />
      </button>
      <button
        onClick={() => carouselRef.current?.next()}
        className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-8 h-8 hidden lg:flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
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
  );
};

export default CarouselHome;
