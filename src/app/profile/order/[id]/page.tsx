import { sendRequest } from "@/utils/api"
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

    return (
        <main className="bg-bg-main pt-[20px] md:pt-[30px]">
            <div className="container bg-white rounded-lg pt-[10px] pb-[26px] px-[15px] md:px-[20px]">
                <h2 className="text-caption-bold md:text-sub-heading-bold py-[8px] border-b border-[#ced4da] uppercase">Chi tiết đơn hàng</h2>
                <InfoOrder
                    id={params.id}
                />
            </div>
        </main>
    )
}

export default OrderDetailPage