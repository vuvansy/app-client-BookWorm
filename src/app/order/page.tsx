import { Button, Result } from "antd"
import Link from "next/link"


const SuccessPage = () => {
    return (
        <main className="bg-bg-main">
            <div className="pt-[20px] container">
                <div className=" bg-white">
                    <Result
                        status="success"
                        title="Đặt hàng thành công"
                        subTitle="Hệ thông đã ghi nhận thông tin đơn hàng của bạn."
                        extra={[
                            <Button key="home">
                                <Link href={"/"} type="primary">
                                    Trang Chủ
                                </Link>
                            </Button>,

                            <Button key="history">
                                <Link href={"/profile/order"} type="primary">
                                    Lịch sử mua hàng
                                </Link>
                            </Button>,
                        ]}
                    />
                </div>
            </div>

        </main>

    )
}

export default SuccessPage