import { sendRequest } from "@/utils/api"
import TableOrder from "./table-order"
import type { Metadata, ResolvingMetadata } from 'next'

import InfoOrder from "./info-order"

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
    return (
        <main className="bg-bg-main pt-[30px]">
            <div className="container bg-white rounded-lg pt-[10px] pb-[26px] px-[20px]">
                <h2 className="text-sub-heading-bold py-[8px] border-b border-[#ced4da] uppercase">Chi tiết đơn hàng</h2>
                <div className="py-[10px] text-caption border-b border-[#ced4da]">
                    <h3 className="text-center text-body-bold py-[10px] uppercase">Thông tin khách hàng</h3>
                    <InfoOrder
                        id={params.id}
                    />
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