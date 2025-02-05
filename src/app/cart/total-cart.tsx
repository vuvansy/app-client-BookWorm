"use client"

import { BsGift } from "react-icons/bs";
import { GrFormNext } from "react-icons/gr";
import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { PiSealPercentBold } from "react-icons/pi";
import Link from "next/link";
import { useState } from "react";
import type { FormProps } from 'antd';

type FieldType = {
    code?: string;

};

const TotalCart = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
    
        const showModal = () => {
            setIsModalOpen(true);
            document.body.classList.add("modal-open"); // Giữ cuộn trang
        };
    
        const handleCancel = () => {
            setIsModalOpen(false);
            document.body.classList.remove("modal-open");
        };
    
    
        const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
            console.log(values)
        };
    return (
        <div className="bg-white rounded-lg px-[15px]">
            <div className="h-[50px] flex justify-between items-center">
                <div className="flex items-center gap-x-2 text-blue-text">
                    <BsGift />
                    <span className="text-caption">KHUYẾN MÃI</span>
                </div>

                <div onClick={showModal} className="flex items-center cursor-pointer text-blue-text text-caption">
                    Xem thêm
                    <GrFormNext className="text-[18px]" />
                </div>
                <Modal

                    open={isModalOpen}
                    onCancel={handleCancel}
                    maskClosable={true}
                    footer={null}  // Ẩn phần footer

                >
                    <div className="text-red1 uppercase flex items-center gap-x-2">
                        <BsGift className="text-[18px]" />
                        Chọn mã khuyến mãi
                    </div>
                    <div className="py-[10px]">
                        <Form
                            name="form-code"
                            className='!relative h-[36px]'
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                name="code"
                                className='!mb-0 '
                            >
                                <Input placeholder="Nhập mã khuyến mãi/quà tặng" className='h-[36px]' />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className='!flex justify-center items-center !absolute top-1/2 transform -translate-y-1/2 right-0 !bg-[#FF0000] !border-solid !border-2 !rounded-none !rounded-r-[6px] !px-[12px] !h-[36px]'>
                                Áp dụng
                            </Button>
                        </Form>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="text-info-bold">Mã giảm giá</p>
                            <p className="text-info-light text-gray-1">Áp dụng tối đa: 1</p>
                        </div>
                        <div className="mt-3">
                            <div className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                <div className="bg-yellow-1 h-[100px] w-[100px] rounded-lg flex justify-center items-center">
                                    <PiSealPercentBold className="text-[40px] text-white" />
                                </div>
                                <div>
                                    <h3 className="uppercase font-semibold">MÃ GIẢM 10K - toàn sàn</h3>
                                    <span className="font-semibold">#ABCSD33</span>
                                    <p>Mua thêm 130.000 đ để nhận mã</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                <div className="bg-yellow-1 h-[100px] w-[100px] rounded-lg flex justify-center items-center">
                                    <PiSealPercentBold className="text-[40px] text-white" />
                                </div>
                                <div>
                                    <h3 className="uppercase font-semibold">MÃ GIẢM 10K - toàn sàn</h3>
                                    <span className="font-semibold">#ABCSD33</span>
                                    <p>Mua thêm 130.000 đ để nhận mã</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="pb-[16px]">
                <div className="font-semibold">ĐƠN HÀNG</div>
                <p className="text-caption-bold py-[10px]">Đừng quên nhập mã giảm giá</p>
                <hr className="border-dashed border border-bg-text" />
                <div className="flex justify-between items-center text-red1 text-sub-heading-bold py-[10px]">
                    <span>Tổng tiền:</span>
                    <span>321.510 đ</span>
                </div>
                <Link href={'/checkout'} className="flex justify-center items-center bg-red1 text-white uppercase text-caption-bold h-[40px] w-full rounded-[8px]">
                    Thanh toán
                </Link>
            </div>
        </div>
    )
}

export default TotalCart