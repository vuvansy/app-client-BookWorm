import { FaShoppingCart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import TableCart from "./table-cart";
import TotalCart from "./total-cart";
import { Breadcrumb } from "antd";
import Link from "next/link";

const CartPage = () => {

    return (
        <main className="bg-bg-main">
            <div className="py-[20px]">
                <div className="container h-[80px] bg-white flex justify-center items-center rounded-lg gap-x-8">
                    <div className="flex items-center gap-x-[8px] text-red1 font-bold">
                        <FaShoppingCart className="text-[22px]" />
                        Giỏ hàng
                    </div>
                    <FaArrowRight className="text-[20px]" />
                    <div className="flex items-center gap-x-[8px]">
                        <FaCartArrowDown className="text-[22px]" />
                        Đặt hàng
                    </div>
                    <FaArrowRight className="text-[20px]" />
                    <div className="flex items-center gap-x-[8px]">
                        <BsCartCheckFill className="text-[22px]" />
                        Hoàn thành đơn hàng
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="flex justify-between">
                    <div className="basis-8/12 bg-white rounded-lg">
                        <TableCart />
                    </div>
                    <div className="basis-4/12 pl-[15px]">
                        <TotalCart />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage