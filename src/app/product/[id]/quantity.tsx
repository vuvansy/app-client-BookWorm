'use client'

import { App } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import type { RootState } from '@/redux/store';
import Swal from "sweetalert2";

type UserAction = "MINUS" | "PLUS"

interface IProps {
    currentBook: IBookTable | null;
}

const QuantitySelector = (props: IProps) => {
    const { currentBook } = props;
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    const [currentQuantity, setCurrentQuantity] = useState<number>(1);
    const { message, notification } = App.useApp();
    const router = useRouter();
    const handleChangeButton = (type: UserAction) => {
        if (type === 'MINUS') {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1);
        }
        if (type === 'PLUS' && currentBook) {
            if (currentQuantity === +currentBook.quantity) {
                notification.warning({
                    message: 'Lỗi Số Lượng',
                    description: (`Số lượng tối đa trong kho chỉ còn ${currentBook.quantity} sản phẩm!`),
                    placement: 'topRight',
                });
                return; //max
            }
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
    const handleBuyNow = (currentBook: IBook, currentQuantity: number) => {
        dispatch(addToCart({ item: currentBook, quantity: currentQuantity }));
        message.success("Thêm sản phẩm vào giỏ hàng thành công.");
        router.push('/cart');
    };

    const handleAddToCart = (currentBook: IBook, currentQuantity: number) => {
        const cartItem = cart.items.find((item) => item._id === currentBook._id);
        const maxQuantity = currentBook.quantity ?? 0;
        const currentCartQuantity = cartItem?.quantity ?? 0;

        if (currentCartQuantity + currentQuantity > maxQuantity) {
            notification.warning({
                message: 'Lỗi Số Lượng',
                description: `Số lượng yêu cầu cho ${currentQuantity + currentCartQuantity} sản phẩm không có sẵn.`,
                placement: 'topRight',
            });
            return;
        }

        dispatch(addToCart({ item: currentBook, quantity: currentQuantity }));

        Swal.fire({
            icon: "success",
            title: "Sản phẩm đã được thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 0.7)",
            color: "#ffffff",
            customClass: { title: "swal-title" },
        });
    };

    return (
        <>
            <div className=' flex items-center gap-x-8 my-4'>
                <div className='text-sub-heading'>Số lượng :</div>
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
            </div>
            <div className='pb-4 flex flex-col md:flex-row gap-y-2 gap-x-2'>
                <button
                    onClick={() => currentBook && handleBuyNow(currentBook, currentQuantity)}
                    className='w-full md:w-[220px] h-[45px] rounded-md bg-red1 text-white text-body-bold flex items-center justify-center gap-x-2'>
                    <FaShoppingCart className='w-[25px] h-[25px]' />
                    Mua ngay
                </button>
                <button
                    onClick={() => currentBook && handleAddToCart(currentBook, currentQuantity)}
                    className='w-full md:w-[220px] h-[45px] rounded-md border border-red1 text-red1 text-body-bold flex items-center justify-center gap-x-2'>
                    <FaCartPlus className='w-[25px] h-[25px]' />
                    Thêm vào giỏ hàng
                </button>
            </div>
        </>
    );
};

export default QuantitySelector;