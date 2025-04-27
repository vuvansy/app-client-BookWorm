"use client"

import { BsCart3 } from "react-icons/bs";
import { LuPackageSearch } from "react-icons/lu";
import { PiShoppingCartBold } from "react-icons/pi";
import Link from 'next/link';
import { Badge, Dropdown, Popover, Space } from 'antd';
import Image from "next/image";
import DropDowAccount from "./dropdow-account";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loadCart } from "@/redux/slices/cartSlice";
import { useEffect, useMemo } from "react";


const DropDowCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items || []) as ICart[];
    useEffect(() => {
        const cartItems = localStorage.getItem("carts");
        if (cartItems) {
            dispatch(loadCart(JSON.parse(cartItems)));
        }
    }, [dispatch]);
    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + (item.detail.price_new ?? 0) * item.quantity,
                0
            ),
        [cartItems]
    );

    // const content = (
    //     <>

    //         {
    //             cartItems.map((book) => (
    //                 <div className='flex pb-2' key={book._id}>
    //                     <Link href={`/product/${book._id}`} className='block relative aspect-square w-[68px] h-[68px]'>
    //                         <Image src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${book.detail.image}`}
    //                             alt=""
    //                             fill
    //                             sizes="100"
    //                             className="w-full object-contain" />
    //                     </Link>
    //                     <div className='ml-2 w-[252px]'>
    //                         <Link href={'/'} className='text-bg-text hover:text-bg-text'>{book.detail.name}</Link>
    //                         <div className='flex items-center gap-x-2 mt-1'>
    //                             <span className='text-body-bold'>{book.detail.price_new}</span>
    //                             <span className='text-gray-1 text-body1'>x{book.quantity}</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))
    //         }
    //         <div className='flex justify-between items-center pt-[16px] pb-[4px]'>
    //             <div>
    //                 <p className='font-semibold'>Tổng cộng</p>
    //                 <span className='text-red1 !text-body-bold'>{(total).toLocaleString()} đ</span>
    //             </div>
    //             <Link href={'/cart'}
    //                 className='w-[186px] h-[40px] border-[2px] border-red1 rounded-lg bg-red1 !text-white text-caption-bold flex justify-center items-center hover:text-white'>
    //                 Xem giỏ hàng
    //             </Link>
    //         </div>
    //     </>

    // );
    const content = (
        <>
            {cartItems.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
                </div>
            ) : (
                <>
                    {cartItems.map((book) => (
                        <div className="flex pb-2" key={book._id}>
                            <Link href={`/product/${book._id}`} className="block relative aspect-square w-[68px] h-[68px]">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${book.detail.image}`}
                                    alt={book.detail.name}
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
                            </Link>
                            <div className="ml-2 w-[252px]">
                                <Link href={`/product/${book._id}`} className="text-bg-text hover:text-bg-text">
                                    {book.detail.name}
                                </Link>
                                <div className="flex items-center gap-x-2 mt-1">
                                    <span className="text-body-bold">{book.detail.price_new}</span>
                                    <span className="text-gray-1 text-body1">x{book.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-[16px] pb-[4px]">
                        <div>
                            <p className="font-semibold">Tổng cộng</p>
                            <span className="text-red1 !text-body-bold">{total.toLocaleString()} đ</span>
                        </div>
                        <Link
                            href="/cart"
                            className="w-[186px] h-[40px] border-[2px] border-red1 rounded-lg bg-red1 !text-white text-caption-bold flex justify-center items-center hover:text-white"
                        >
                            Xem giỏ hàng
                        </Link>
                    </div>
                </>
            )}
        </>
    );


    return (
        <ul className='flex items-center gap-x-[10px] lg:gap-x-[20px]'>
            <li className='cursor-pointer'>
                <Popover
                    placement="bottom"
                    rootClassName="popover-carts"
                    title={
                        <div className="flex items-center gap-x-2 py-[10px] border-b-[1px] !text-body-bold">
                            <BsCart3 className='w-[18px] h-[18px]' />
                            <span>Giỏ hàng ({cartItems?.length ?? 0})</span>
                        </div>
                    }
                    content={content}
                    arrow={true}>
                    <Badge
                        count={cartItems?.length ?? 0}
                        size={"small"}
                        showZero
                        style={{ backgroundColor: '#C92127' }}
                    >
                        <PiShoppingCartBold className='icon-cart top-[4px]' />
                    </Badge>
                </Popover>
            </li>
            <li className='cursor-pointer'>
                <Link href={'/search-order'}>
                    <LuPackageSearch className='icon-cart' />
                </Link>
            </li>
            <li className="flex items-center cursor-pointer">
                <DropDowAccount />
            </li>
        </ul>
    )
}

export default DropDowCart