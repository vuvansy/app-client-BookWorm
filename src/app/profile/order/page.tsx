import TableHistoryOrder from "./table-history-order";


const OrderPage = () => {

    return (
        <main className="bg-bg-main pt-[20px] md:pt-[30px]">
            <div className="container bg-white rounded-lg">
                <h2 className="text-center pt-[20px] text-caption-bold md:text-sub-heading-bold uppercase">Đơn Hàng Của Bạn</h2>
                <TableHistoryOrder />
            </div>
        </main>

    )
}

export default OrderPage