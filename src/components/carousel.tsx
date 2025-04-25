"use client";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { sendRequest } from "@/utils/api";

const CarouselHome: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await sendRequest<IBackendRes<IBanner>>({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/banner`,
          method: "GET",
        });

        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const activeBanners = res.data.filter(
            (banner) => banner.status === true
          );
          setImages(activeBanners.map((banner) => banner.image));
        }
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, []);
  return (
    <div className="w-full max-w-[840px] relative">
      <Carousel ref={carouselRef} className="custom-carousel">
        {images.map((img, index) => (
          <div key={index}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/banner/${img}`}
              alt="Slide image"
              width={840}
              height={320}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              className="w-full h-[320px] object-cover rounded-lg"
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
