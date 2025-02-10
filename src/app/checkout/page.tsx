import { FaShoppingCart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import InfoCheckout from "./info-checkout";

const CheckoutPage = () => {

    return (
        <main className="bg-bg-main">
            <div className="py-[20px]">
                <div className="container h-[80px] bg-white flex justify-center items-center rounded-lg gap-x-8">
                    <div className="flex items-center gap-x-[8px]">
                        <FaShoppingCart className="text-[22px]" />
                        Giỏ hàng
                    </div>
                    <FaArrowRight className="text-[20px]" />
                    <div className="flex items-center gap-x-[8px] text-red1 font-bold">
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
                <InfoCheckout />
            </div>
            <div className="container mt-[20px]">
                <div className="bg-white py-2 px-[16px] rounded-lg">
                    <h1 className="uppercase py-2 font-semibold">Kiểm tra lại đơn hàng</h1>
                    <div className="py-1">
                        <div className="pt-1 pb-2 border-t border-[#ced4da]">
                            <div className="flex py-1">
                                <div className="relative w-[145px] h-[145px]">
                                    <Image src="/books/sachvanhoa.jpeg" alt="" className="object-cover" fill />
                                </div>
                                <div className="flex text-caption px-1 w-[calc(100%-145px)]">
                                    <div className="w-[calc(100%-345px)]">
                                        Chinh Phục Đề Thi THPT Quốc Gia Tiếng Trung - Khối D4
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">
                                        <div>101,500 đ</div>
                                        <div className="text-[#bfbfbf] line-through">145,000 đ</div>
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">1</div>
                                    <div className="text-yellow-2 w-[100px] text-center font-semibold">101,500 đ</div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1 pb-2 border-t border-[#ced4da]">
                            <div className="flex py-1">
                                <div className="relative w-[145px] h-[145px]">
                                    <Image src="/books/sachtienganh.jpeg" alt="" className="object-cover" fill />
                                </div>
                                <div className="flex text-caption px-1 w-[calc(100%-145px)]">
                                    <div className="w-[calc(100%-345px)]">
                                        "Chém" Tiếng Anh Không Cần Động Não - Tặng Kèm Bộ Video Luyện Nghe-Nói + Sổ Học Từ Vựng
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">
                                        <div>101,500 đ</div>
                                        <div className="text-[#bfbfbf] line-through">145,000 đ</div>
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">1</div>
                                    <div className="text-yellow-2 w-[100px] text-center font-semibold">101,500 đ</div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1 pb-2 border-t border-[#ced4da]">
                            <div className="flex py-1">
                                <div className="relative w-[145px] h-[145px]">
                                    <Image src="/books/sachtienganh.jpeg" alt="" className="object-cover" fill />
                                </div>
                                <div className="flex text-caption px-1 w-[calc(100%-145px)]">
                                    <div className="w-[calc(100%-345px)]">Chinh Phục Đề Thi THPT Quốc Gia Tiếng Trung - Khối D4</div>
                                    <div className="w-[100px] pb-1 text-center">
                                        <div>101,500 đ</div>
                                        <div className="text-[#bfbfbf] line-through">145,000 đ</div>
                                    </div>
                                    <div className="w-[100px] pb-1 text-center">1</div>
                                    <div className="text-yellow-2 w-[100px] text-center font-semibold">101,500 đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CheckoutPage