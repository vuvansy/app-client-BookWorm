import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const imageCarousel = [
  {
    id: 1,
    image: "/trangct2_252_840x320.webp",
  },
  {
    id: 2,
    image: "/MCBooks_Vangt2_840x320.webp",
  },
  {
    id: 3,
    image: "/DinhTi_0225_840x320.webp",
  },
];

const CarouselPage: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };
  return (
    <div className="w-[67%] h-[320px] relative">
      <button
        onClick={prevSlide}
        className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-gray-200"
      >
        <LeftOutlined className="text-xl" />
      </button>
      <Carousel ref={carouselRef} className="custom-carousel" autoplay>
        {imageCarousel.map((item) => (
          <div
            key={item.id}
            className="relative h-[320px] w-full overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt="Example image"
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 830px"
              />
            </div>
          </div>
        ))}
      </Carousel>
      <button
        onClick={nextSlide}
        className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-gray-200"
      >
        <RightOutlined className="text-xl" />
      </button>
      <style jsx global>{`
        .custom-carousel .slick-list {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
};

export default CarouselPage;
