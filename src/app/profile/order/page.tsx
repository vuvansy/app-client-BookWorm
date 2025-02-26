import Link from "next/link"


const OrderPage = () => {
    return (
        <main className="bg-bg-main pt-[30px]">
            <div className="container bg-white rounded-lg">
                <h2 className="text-center pt-[20px] text-sub-heading-bold uppercase">Đơn Hàng Của Bạn</h2>
                <div className="py-[20px] ] px-[10px]">
                    <table className="table-auto border-collapse w-full text-[15px]">
                        <thead>
                            <tr>
                                <th className="p-[10px] text-left ">Mã Đơn Hàng</th>
                                <th className="p-[10px] text-left">Ngày Đặt Hàng</th>
                                <th className="p-[10px]">Tổng Tiền</th>
                                <th className="p-[10px]">Hình thức thanh toán</th>
                                <th className="p-[10px]">Trạng Thái</th>
                                <th className="p-[10px]">Thao Tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-y odd:bg-gray-100 even:bg-white text-caption">
                                <td className="p-[10px] border-b border-solid border-[#ddd]">
                                    65ef17cecce6ab14801fd9b7
                                </td>
                                <td className="p-[10px] text-left border-b border-solid border-[#ddd]">
                                    20:00:00 / 9-2-2025
                                </td>
                                <td className="p-[10px] text-center text-price-special font-semibold border-b border-solid border-[#ddd]">
                                    {(99000).toLocaleString()} đ
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Thanh toán khi nhận hàng
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Chờ xác nhận
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    <Link href={'/profile/order/1'} className="py-[6px] px-[16px] bg-price-special !text-white rounded-lg">
                                        Chi Tiết
                                    </Link>
                                </td>
                            </tr>
                            <tr className="border-y odd:bg-gray-100 even:bg-white text-caption">
                                <td className="p-[10px] border-b border-solid border-[#ddd]">
                                    65ef17cecce6ab14801fd9b7
                                </td>
                                <td className="p-[10px] text-left border-b border-solid border-[#ddd]">
                                    20:00:00 / 9-2-2025
                                </td>
                                <td className="p-[10px] text-center text-price-special font-semibold border-b border-solid border-[#ddd]">
                                    {(99000).toLocaleString()} đ
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Thanh toán khi nhận hàng
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Chờ xác nhận
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    <Link href={'/profile/order/1'} className="py-[6px] px-[16px] bg-price-special !text-white rounded-lg">
                                        Chi Tiết
                                    </Link>
                                </td>
                            </tr>
                            <tr className="border-y odd:bg-gray-100 even:bg-white text-caption">
                                <td className="p-[10px] border-b border-solid border-[#ddd]">
                                    65ef17cecce6ab14801fd9b7
                                </td>
                                <td className="p-[10px] text-left border-b border-solid border-[#ddd]">
                                    20:00:00 / 9-2-2025
                                </td>
                                <td className="p-[10px] text-center text-price-special font-semibold border-b border-solid border-[#ddd]">
                                    {(99000).toLocaleString()} đ
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Thanh toán khi nhận hàng
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    Chờ xác nhận
                                </td>
                                <td className="p-[10px] text-center border-b border-solid border-[#ddd]">
                                    <Link href={'/profile/order/1'} className="py-[6px] px-[16px] bg-price-special !text-white rounded-lg">
                                        Chi Tiết
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>


        </main>

    )
}

export default OrderPage