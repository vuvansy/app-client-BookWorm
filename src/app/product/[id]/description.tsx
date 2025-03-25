'use client'
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface IProps {
    currentBook: IBookTable | null;
}


const ProductDescription = (props: IProps) => {
    const { currentBook } = props;
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
                    <div className="text-caption" dangerouslySetInnerHTML={{ __html: currentBook?.description || "" }}>
                        {/* {currentBook?.description} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDescription;
