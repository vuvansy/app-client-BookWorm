'use client'
import { ConfigProvider, Rate } from "antd";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
}
const reviews: Review[] = [
    { name: "Tạ Văn Tuấn", rating: 5, comment: "Sách hay lắm ạ, cả nhà nên mua nhé. Sách hay lắm ạ, cả nhà nên mua nhé. Sách hay lắm ạ, cả nhà nên mua nhé. Sách hay lắm ạ, cả nhà nên mua nhé. Sách hay lắm ạ, cả nhà nên mua nhé.", date: "21:00 | 21/02/2025" },
    { name: "Khang", rating: 3.5, comment: "Sách hay nên đọc 1 lần", date: "21:00 | 21/02/2025" },

];

const CustomerReviews = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=" rounded-lg">
            <div className={`flex justify-between items-center bg-red1 px-4  ${isOpen ? '' : 'rounded-b-lg'}`}>
                <h3 className="flex items-center text-sub-heading-bold leading-10 text-white">
                    Đánh giá từ khách hàng
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white"
                >
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
            </div>
            {isOpen && (
                <div className="bg-white rounded-b-lg">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="bg-white rounded-lg flex flex-col lg:flex-row px-4 py-1">
                                <div className="w-full lg:w-[10%] ">
                                    <div className="text-caption ">{review.name}</div>
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Rate: {
                                                    starSize: 14,
                                                }
                                            },
                                            token: {
                                                marginXS: 2,
                                            }
                                        }}
                                    >
                                        <Rate disabled allowHalf defaultValue={review.rating} />
                                    </ConfigProvider>
                                </div>
                                <div className="w-full lg:w-[90%] text-caption  ">
                                    <div className=" flex flex-col lg:flex-row lg:justify-between  ">
                                        <div className="w-full my-2 lg:w-[85%] lg:my-0  ">{review.comment}</div>
                                        <div className="w-full lg:w-[15%] lg:text-right">{review.date}</div>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-lg flex items-center justify-center h-[100px]">
                            <div className="text-caption">Sản phẩm chưa có đánh giá</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerReviews;
