import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
const imageCarousel = [
  {
    id: 1,
    image: "/Frame96.png",
  },
  {
    id: 2,
    image: "/Frame97.png",
  },
  {
    id: 3,
    image: "/Frame98.png",
  },
];

const contentStyle: React.CSSProperties = {
  height: "320px",
  color: "#fff",
  lineHeight: "320px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselPage: React.FC = () => (
  <div className="w-[830px] h-[320px]">
    <Carousel autoplay>
      {imageCarousel.map((item) => (
        <div key={item.id}>
          <h3 style={contentStyle}>
            <Image
              src={item.image}
              alt="Example image"
              width={830}
              height={320}
            />
          </h3>
        </div>
      ))}
    </Carousel>
  </div>
);

export default CarouselPage;
