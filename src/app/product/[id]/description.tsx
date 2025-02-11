'use client'
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const product = {
    title: "Bạn Là Ai Giữa Muôn Vàn Phong Cách Sống",
    description:
        "BẠN LÀ AI GIỮA MUÔN VÀN PHONG CÁCH SỐNG? - Chuyến hành trình khám phá nội tâm để tìm thấy phong cách sống của riêng mình...",
};

const ProductDescription = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className=" bg-white rounded-t-lg px-4 py-4 ">
            <div className="flex justify-between items-center ">
                <div className="flex items-center text-sub-heading-bold leading-6">
                    Mô tả sản phẩm
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
            </div>
            {isOpen && (
                <div className="pt-4">
                    <div className="text-caption-bold">{product.title}</div>
                    <div className="text-caption">{product.description}</div>
                </div>
            )}
        </div>
    );
};

export default ProductDescription;
