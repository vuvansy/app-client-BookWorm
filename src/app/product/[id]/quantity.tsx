'use client'
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

type UserAction = "MINUS" | "PLUS"

interface IProps {
    currentBook: IBookTable | null;
}

const QuantitySelector = (props: IProps) => {
    const { currentBook } = props;
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);

    const handleChangeButton = (type: UserAction) => {
        if (type === 'MINUS') {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1);
        }
        if (type === 'PLUS' && currentBook) {
            if (currentQuantity === +currentBook.quantity) return; //max
            setCurrentQuantity(currentQuantity + 1);
        }
    }

    const handleChangeInput = (value: string) => {
        if (/^\d*$/.test(value)) {
            if (value === "") {
                setCurrentQuantity(0);
            } else {
                const numericValue = +value;
                if (currentBook && numericValue > +currentBook.quantity) {
                    setCurrentQuantity(+currentBook.quantity);
                } else {
                    setCurrentQuantity(numericValue);
                }
            }
        }
    };

    const handleBlurInput = () => {
        if (currentQuantity === 0 || currentQuantity === null) {
            setCurrentQuantity(1);
        }
    };

    return (
        <div className="h-[32px] border border-gray-400 flex items-center justify-evenly rounded">
            <div onClick={() => handleChangeButton('MINUS')} className='text-gray-1 cursor-pointer pl-2 pr-4'>
                <FaMinus />
            </div>
            <input
                onChange={(event) => handleChangeInput(event.target.value)}
                onBlur={handleBlurInput}
                value={currentQuantity === 0 ? "" : currentQuantity}
                className='w-[3em] text-[#0D0E0F] font-bold text-[1.2em] h-full text-center outline-none'
            />
            <div onClick={() => handleChangeButton('PLUS')} className='text-gray-1 cursor-pointer pr-2 pl-4'>
                <FaPlus />
            </div>
        </div>
    );
};

export default QuantitySelector;