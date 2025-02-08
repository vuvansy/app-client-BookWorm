"use client"

import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spin } from "antd";

interface CartItem {
    id: string;
    image: string;
    name: string;
    priceNew: number;
    priceOld: number;
    quantity: number;
}


const TableCart = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

    useEffect(() => {
        // Giả lập tải dữ liệu
        setTimeout(() => {
            setCartItems([
                {
                    id: "1",
                    image: "/books/sachvanhoa.png",
                    name: "Bộ Sách Đột Phá Tư Duy - Kỷ Niệm 20 Năm Onward (Bộ 5 Cuốn)",
                    priceNew: 150000,
                    priceOld: 250000,
                    quantity: 1,
                },
                {
                    id: "2",
                    image: "/books/sachlichsu.webp",
                    name: "Tuổi Thơ Dữ Dội - (Tái Bản 2019)",
                    priceNew: 150000,
                    priceOld: 250000,
                    quantity: 1,
                },
                {
                    id: "3",
                    image: "/books/sachtienganh.jpeg",
                    name: "Chạm Đến Thành Công - Bìa Cứng",
                    priceNew: 150000,
                    priceOld: 250000,
                    quantity: 1,
                },
            ]);
            setLoading(false); // Dữ liệu đã được tải xong
        }, 2000); // Giả lập việc tải dữ liệu mất 2 giây
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[100px]">
                <Spin size="large" />
            </div>
        ); // Hiển thị spinner trong khi loading
    }


    const handleQuantityChange = (
        id: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = +event.target.value;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: value > 0 ? value : 1 }
                    : item
            )
        );
    };

    const handleIncrement = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <>
            <table className="table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="w-[6%] p-[10px]">STT</th>
                        <th className="w-[16%] p-[10px]">Ảnh</th>
                        <th className="w-[40%] p-[10px] min-w-[330px]">Sản phẩm</th>
                        <th className="w-[12%] p-[10px]">Số lượng</th>
                        <th className="w-[18%] p-[10px]">Thành tiền</th>
                        <th className="w-[8%] p-[10px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item, index) => (
                            <tr className="" key={item.id}>
                                <th className="text-center border-b border-solid border-[#ddd]">{index + 1}</th>
                                <td className="border-b border-solid border-[#ddd]">
                                    <div className="relative w-[119px] h-[119px] mx-auto">
                                        <Link href={`/product/${item.id}`} className="">
                                            <Image src={item.image} alt="" className="object-cover" fill />
                                        </Link>
                                    </div>
                                </td>
                                <td className="border-b border-solid border-[#ddd]">
                                    <div className="px-[10px] w-full">
                                        <div className="text-caption mb-[4px]">
                                            <Link href={`/product/${item.id}`} className="block w-full">{item.name}</Link>
                                        </div>
                                        <div className="">
                                            <span className="text-bg-text font-semibold">{item.priceNew.toLocaleString()} đ</span>
                                            <span className="text-info text-gray-1 line-through ml-3">{item.priceOld.toLocaleString()} đ</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center border-b border-solid border-[#ddd]">
                                    <div className="mx-auto h-[30px] max-w-[80px] flex justify-between items-center border border-solid border-[#ddd] rounded-[5px]">
                                        <div className="cursor-pointer pl-1"
                                            onClick={() => handleDecrement(item.id)}
                                        >
                                            <RiSubtractFill className="text-[18px] text-gray-1" />
                                        </div>
                                        <input
                                            className="w-[28px] text-center text-[#545759] font-semibold"
                                            type="text"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e)}

                                        />
                                        <div className="cursor-pointer pr-1"
                                            onClick={() => handleIncrement(item.id)}
                                        >
                                            <IoMdAdd className="text-[18px] text-gray-1" />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center text-price-special font-semibold border-b border-solid border-[#ddd]">{(99000).toLocaleString()} đ</td>
                                <td className="text-center border-b border-solid border-[#ddd]">
                                    <div className="flex items-center justify-center h-full cursor-pointer">
                                        <FaRegTrashCan
                                            className="text-[18px] hover:text-red1 text-[#646464]"
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <div className="py-[20px] flex justify-center">
                <button className="w-[98%] h-[40px]  text-price-special font-semibold border border-solid border-[#ddd] rounded-lg">
                    Xóa hết giỏ hàng
                </button>
            </div>
        </>
    )
}

export default TableCart