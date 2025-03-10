"use client"

import Image from "next/image"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const BookCart = () => {
    const cartData = useSelector((state: RootState) => state.cart.items || []) as ICart[];
    const [cartItems, setCartItems] = useState<ICart[]>([]);

    useEffect(() => {
        setCartItems(cartData);
    }, [cartData]);

    return (
        <div className="container mt-[20px]">
            <div className="bg-white py-2 px-[16px] rounded-lg">
                <h1 className="uppercase py-2 font-semibold">Kiểm tra lại đơn hàng</h1>
                <div className="py-1">
                    {cartItems.map((book) => (
                        <div key={book._id} className="pt-1 pb-2 border-t border-[#ced4da]">
                            <div className="flex py-1">
                                <div className="relative w-[145px] h-[145px]">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${book.detail.image}`}
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        priority
                                        className="w-full object-cover"
                                    />
                                </div>
                                <div className="flex text-caption px-1 w-[calc(100%-145px)]">
                                    <div className="w-[calc(100%-345px)]">
                                        {book.detail.name}
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">
                                        <div>{new Intl.NumberFormat("vi-VN").format(book.detail.price_new ?? 0)} đ</div>
                                        <div className="text-[#bfbfbf] line-through">
                                            {new Intl.NumberFormat("vi-VN").format(book.detail.price_old)} đ
                                        </div>
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">1</div>
                                    <div className="text-yellow-2 w-[100px] text-center font-semibold">
                                        {new Intl.NumberFormat("vi-VN").format(
                                            (book.detail.price_new ?? 0) * book.quantity
                                        )} đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BookCart