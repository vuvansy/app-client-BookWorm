"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import TableCart from "./table-cart"
import TotalCart from "./total-cart"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProps {
    dataCoupon: ICoupon[];
}

const InfoCart = (props: IProps) => {
    const { dataCoupon } = props

    const cartItems = useSelector((state: RootState) => state.cart.items) as ICart[];
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="container">
            {cartItems.length > 0 ? (
                <div className="flex justify-between items-start flex-wrap">
                    <TableCart />
                    <TotalCart dataCoupon={dataCoupon} />
                </div>
            ) : (
                <div className="bg-white rounded-lg min-h-[300px] flex flex-col gap-y-[10px] justify-center items-center text-center">
                    <div className="w-[400px] h-[300px] relative">
                        <Image
                            src="/icon/empty-cart.webp"
                            alt="Giỏ hàng trống"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="text-base font-medium">Chưa có sản phẩm trong giỏ hàng của bạn!</div>
                    <Link
                        href="/"
                        className="mb-[20px] px-4 py-2 bg-red1 !text-white rounded-md border border-red1 font-semibold"
                    >
                        MUA SẮM NGAY
                    </Link>
                </div>
            )}
        </div>
    )
}

export default InfoCart