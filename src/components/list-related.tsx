"use client"

import { Swiper, SwiperSlide } from 'swiper/react';;
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import 'swiper/css';
import 'swiper/css/pagination';
import BoxProduct from './list-product/box-product';

interface Props {
    booksByGenreAPI?: IBookTable[] | null;
}

const ListRelated = (props: Props) => {
    const { booksByGenreAPI } = props
    return (
        <div className='container'>
            <div className='relative'>
                <button className="absolute shadow-custom left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white flex items-center justify-center rounded-[50%] button-prev-slide">
                    <GrFormPrevious className="text-gray-1 text-[26px]" />
                </button>
                <Swiper
                    spaceBetween={18}
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
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        },
                    }}
                >
                    {booksByGenreAPI?.map((product) => (
                        <SwiperSlide key={product._id} className="">
                            <BoxProduct
                                id={product._id}
                                image={product.image}
                                name={product.name}
                                price_new={product.price_new}
                                price_old={product.price_old}
                                rating={product.rating ?? 0}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="absolute shadow-custom right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px]  bg-white flex items-center justify-center rounded-[50%] button-next-slide">
                    <MdOutlineNavigateNext className="text-gray-1 text-[26px]" />
                </button>
            </div>
        </div>
    )
}

export default ListRelated