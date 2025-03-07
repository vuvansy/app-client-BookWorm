"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import BoxProductHome from "@/components/list-product/box-product-home";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  products?: IBookTable[];
}

const ListFlashSale = (props: Props) => {
  const { products } = props;
  return (
    <div className="container px-4 lg:px-0">
      <div className="relative">
        <button className="hidden lg:flex absolute shadow-custom left-[-10px] lg:left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[30px] md:w-[40px] h-[30px] md:h-[40px] bg-white items-center justify-center rounded-full button-prev-slide">
          <GrFormPrevious className="text-gray-1 text-[20px] md:text-[26px]" />
        </button>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[Navigation, Scrollbar, Autoplay]}
          scrollbar={{ hide: true }}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          autoHeight={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id} className="">
              <BoxProductHome
                id={product._id}
                image={product.image}
                name={product.name}
                price_new={product.price_new}
                price_old={product.price_old}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="hidden lg:flex absolute shadow-custom right-[-10px] lg:right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[30px] md:w-[40px] h-[30px] md:h-[40px] bg-white items-center justify-center rounded-full button-next-slide">
          <MdOutlineNavigateNext className="text-gray-1 text-[20px] md:text-[26px]" />
        </button>
      </div>
    </div>
  );
};

export default ListFlashSale;
