import React from "react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import BoxProduct from "../list-product/box-product-home";

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
];
export default function BoxFlashSale2() {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <div key={product.id} className="">
            <SwiperSlide>
              <BoxProduct {...product} />{" "}
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}
