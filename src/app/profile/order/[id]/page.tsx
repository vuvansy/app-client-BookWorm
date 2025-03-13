import { sendRequest } from "@/utils/api"
import TableOrder from "./table-order"
import type { Metadata, ResolvingMetadata } from 'next'
import { Button } from "antd"

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "Đơn hàng của bạn",
    }
}

const OrderDetailPage = async (props: Props) => {
    const { params } = props;


    const resInfo = await sendRequest<IBackendRes<IOrder>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-id/${params.id}`,
        method: "GET"
    })
    const order = resInfo.data;

    const resOrder = await sendRequest<IBackendRes<IOrderDetailTable[]>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/order-detail/${params.id}`,
        method: "GET"
    })
    const dataOrderTable = resOrder.data;

    const orderStatusMap: Record<number, string> = {
        0: "Chờ Xác Nhận",
        1: "Đã Xác Nhận",
        2: "Đang Vận Chuyển",
        3: "Đã Giao Hàng",
        4: "Đã hủy"
    };
    const getStatusColor = (status: number | undefined) => {
        switch (status) {
            case 1: return "bg-blue-500";
            case 2: return "bg-[#2db7f5]";
            case 3: return "bg-green-500";
            case 4: return "bg-red-500";
            default: return "bg-yellow-500";
        }
    };
    const getStatusLabel = (status: number) => orderStatusMap[status] || "Không xác định";
    const address = typeof order?.address === "string" ? JSON.parse(order.address) : order?.address;
    return (
        <main className="bg-bg-main pt-[30px]">
            <div className="container bg-white rounded-lg pt-[10px] pb-[26px] px-[20px]">
                <h2 className="text-sub-heading-bold py-[8px] border-b border-[#ced4da] uppercase">Chi tiết đơn hàng</h2>
                <div className="py-[10px] text-caption border-b border-[#ced4da]">
                    <h3 className="text-center text-body-bold py-[10px] uppercase">Thông tin khách hàng</h3>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Mã Đơn Hàng:</span>
                        <p>{order?._id}</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Tên Khách Hàng:</span>
                        <p>{order?.fullName}</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Địa Chỉ Giao Hàng:</span>
                        <p>
                            {`${address?.street}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.city?.name}`}
                        </p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Email:</span>
                        <p>{order?.email}</p>
                    </div>
                    <div className="flex gap-2 mb-[8px]">
                        <span className="text-caption-bold">Số Điện Thoại:</span>
                        <p>{order?.phone}</p>
                    </div>
                    <div className="flex gap-2 mb-[6px]">
                        <span className="text-caption-bold">Ngày Đặt Hàng:</span>
                        {new Date(order?.createdAt ?? Date.now()).toLocaleString()}
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-2">
                            <span className="text-caption-bold">Trạng Thái:</span>
                            <span className={`${getStatusColor(order?.status)} text-white px-2 py-[2px] rounded-md font-medium`}>
                                {getStatusLabel(order?.status as number)}
                            </span>
                        </div>
                        {order?.status === 0 && (
                            <Button danger size="small" type="dashed">Hủy</Button>
                        )}
                    </div>
                </div>
                <TableOrder
                    dataOrderTable={dataOrderTable || []}
                    order={order}
                />
            </div>
        </main>
    )
}

export default OrderDetailPage