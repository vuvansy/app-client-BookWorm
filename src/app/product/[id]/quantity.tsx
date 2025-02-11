'use client'
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="w-[80px] h-[30px] border border-gray-400 flex items-center justify-evenly rounded-md">
            <div onClick={handleDecrease} className='text-gray-1'>
                <FaMinus />
            </div>
            <div className=" font-semibold">
                {quantity}
            </div>
            <div onClick={handleIncrease} className='text-gray-1'>
                <FaPlus />
            </div>
        </div>
    );
};

export default QuantitySelector;