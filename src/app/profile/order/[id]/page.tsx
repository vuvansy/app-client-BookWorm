import TableOrder from "./table-order"

const OrderDetailPage = () => {

    return (
        <main className="bg-bg-main pt-[30px]">
            <div className="container bg-white rounded-lg pt-[10px] pb-[26px] px-[20px]">
                <h2 className="text-sub-heading-bold py-[8px] border-b border-[#ced4da] uppercase">Chi tiết đơn hàng</h2>
                <div className="py-[10px] text-caption border-b border-[#ced4da]">
                    <h3 className="text-center text-body-bold py-[10px] uppercase">Thông tin khách hàng</h3>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Mã Đơn Hàng:</span>
                        <p>65ef17cecce6ab14801fd9b7</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Tên Khách Hàng:</span>
                        <p>Vũ Văn Sỹ</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Địa Chỉ Giao Hàng:</span>
                        <p>72N, Đường HT05, Khu Phố 24, Phường Tân Chánh Hiệp, Quận 12, TP.Hồ Chí Minh</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Email:</span>
                        <p>vuvansy@gmail.com</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Số Điện Thoại:</span>
                        <p>0828937375</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Ngày Đặt Hàng:</span>
                        <p>09-02-2025</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-caption-bold">Trạng Thái:</span>
                        <p>Đang xử lý</p>
                    </div>
                </div>
                <TableOrder />
            </div>
        </main>
    )
}

export default OrderDetailPage