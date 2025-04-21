import { FaShoppingCart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import InfoCart from "./info-cart";
import { sendRequest } from "@/utils/api";

const CartPage = async () => {
    const res = await sendRequest<IBackendRes<ICoupon[]>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/coupon`,
        method: "GET"

    })
    const dataCoupon = res.data ?? []
    return (
        <main className="bg-bg-main">
            <div className="py-[20px]">
                <div className="container h-[80px] bg-white flex justify-center items-center text-[14px] rounded-lg gap-x-4 md:gap-x-8">
                    <div className="flex items-center gap-x-[8px] text-red1 font-bold">
                        <FaShoppingCart className="text-[16px] sm:text-[22px]" />
                        Giỏ hàng
                    </div>
                    <FaArrowRight className="sm:text-[20px]" />
                    <div className="flex items-center gap-x-[8px]">
                        <FaCartArrowDown className="text-[16px] sm:text-[22px]" />
                        Đặt hàng
                    </div>
                    <FaArrowRight className="sm:text-[20px]" />
                    <div className="flex items-center gap-x-[8px]">
                        <BsCartCheckFill className="text-[16px] sm:text-[22px]" />
                        Hoàn thành đơn hàng
                    </div>
                </div>
            </div>
            <InfoCart dataCoupon={dataCoupon} />
        </main>
    )
}

export default CartPage