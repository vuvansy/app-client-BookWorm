"use client"

import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    updateQuantity,
    clearCart,
} from "@/redux/slices/cartSlice";


const TableCart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items || []) as ICart[];
    const dispatch = useDispatch();

    const handleDecrement = (id: string) => {
        dispatch(decrementQuantity(id));
    };

    const handleIncrement = (id: string) => {
        dispatch(incrementQuantity(id));
    };

    const handleQuantityChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value) || value < 1) return;

        dispatch(updateQuantity({ id, quantity: value }));
    };


    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="basis-8/12 bg-white rounded-lg">
            <table className="table-auto border-collapse w-full text-[15px] mt-[6px]">
                <thead>
                    <tr>
                        <th className="w-[6%] p-[10px]">STT</th>
                        <th className="w-[16%] p-[10px]">Ảnh</th>
                        <th className="w-[40%] p-[10px]">Sản phẩm</th>
                        <th className="w-[12%] p-[10px]">Số lượng</th>
                        <th className="w-[18%] p-[10px]">Thành tiền</th>
                        <th className="w-[8%] p-[10px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr className="" key={item._id}>
                            <th className="text-center border-b border-solid border-[#ddd]">{index + 1}</th>
                            <td className="border-b border-solid border-[#ddd]">
                                <div className="relative w-[119px] h-[119px] mx-auto">
                                    <Link href={`/product/${item._id}`} className="">
                                        <Image src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item.detail.image}`} alt="" className="object-cover" fill />
                                    </Link>
                                </div>
                            </td>
                            <td className="border-b border-solid border-[#ddd] align-top">
                                <div className="px-[10px] pt-[2px] w-full">
                                    <div className="text-caption mb-[4px]">
                                        <Link href={`/product/${item._id}`} className="block w-full">{item.detail.name}</Link>
                                    </div>
                                    <div>
                                        <span className="text-bg-text font-semibold text-body1">
                                            {new Intl.NumberFormat("vi-VN").format(item.detail.price_new)} đ
                                        </span>
                                        <span className="text-info text-gray-1 line-through ml-3">
                                            {new Intl.NumberFormat("vi-VN").format(item.detail.price_old)} đ
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center border-b border-solid border-[#ddd]">
                                <div className="mx-auto h-[30px] max-w-[80px] flex justify-between items-center border border-solid border-[#ddd] rounded-[5px]">
                                    <div className="cursor-pointer pl-1"
                                        onClick={() => handleDecrement(item._id)}
                                    >
                                        <RiSubtractFill className="text-[18px] text-gray-1" />
                                    </div>
                                    <input
                                        className="w-[28px] text-center text-[#545759] font-semibold outline-none"
                                        type="text"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item._id, e)}

                                    />
                                    <div className="cursor-pointer pr-1"
                                        onClick={() => handleIncrement(item._id)}
                                    >
                                        <IoMdAdd className="text-[18px] text-gray-1" />
                                    </div>
                                </div>
                            </td>
                            <td className="text-center text-price-special font-semibold border-b border-solid border-[#ddd] text-body1">
                                {new Intl.NumberFormat("vi-VN").format(
                                    ((item.detail.price_new ?? item.detail.price_old) ?? 0) * item.quantity
                                )} đ
                            </td>
                            <td className="text-center border-b border-solid border-[#ddd]">
                                <div className="flex items-center justify-center h-full cursor-pointer">
                                    <FaRegTrashCan
                                        className="text-[18px] hover:text-red1 text-[#646464]"
                                        onClick={() => handleRemoveItem(item._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div className="py-[20px] flex justify-center">
                <button
                    onClick={handleClearCart}
                    className="w-[98%] h-[40px] text-caption text-price-special font-semibold border border-solid border-[#ddd] rounded-lg hover:bg-red1 hover:text-white">
                    Xóa hết giỏ hàng
                </button>
            </div>
        </div>

    )
}

export default TableCart