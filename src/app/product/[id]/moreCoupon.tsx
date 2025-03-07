'use client'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { GrFormNext } from "react-icons/gr";
import { PiSealPercentBold } from 'react-icons/pi';


interface Coupon {
    name: string;
    value: string;
    min: number;
    max: number;
    create_date: string;
    end_date: string;
}

const coupons = [
    { name: "Mã giảm 12%", value: "12%", min: 129000, max: 30000, create_date: "01/01/2025", end_date: "21/02/2025" },
    { name: "Mã giảm 20%", value: "20%", min: 200000, max: 50000, create_date: "02/01/2025", end_date: "22/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "03/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "04/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "05/01/2025", end_date: "23/02/2025" },
    { name: "Mã giảm 20% - nhà sản xuất abc", value: "20%", min: 200000, max: 50000, create_date: "06/01/2025", end_date: "23/02/2025" },

];

const MoreCoupon = () => {
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {

        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };
    const formatNumber = (number: number) => {
        if (number >= 1000) {
            const formattedNumber = (number / 1000).toFixed(1);
            return formattedNumber.endsWith('.0') ? formattedNumber.slice(0, -2) + 'K' : formattedNumber + 'K';
        }
        return number;
    }
    return (
        <div>
            <div onClick={showModal} className="w-[115px] flex items-center justify-center text-caption text-blue-text-bold cursor-pointer">Xem thêm <GrFormNext /> </div>
            <Modal

                open={isOpen}
                onCancel={handleCancel}
                maskClosable={true}
                footer={null}  // Ẩn phần footer
            >
                <div>
                    <div className="flex items-center">
                        <p className="text-info-bold">Mã giảm giá</p>
                    </div>
                    <div className="mt-3 max-h-[350px] overflow-y-auto">
                        {coupons.map((coupon, index) => (
                            <div key={index} className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                <div className="bg-yellow-1 h-[100px] w-[100px] rounded-lg flex justify-center items-center">
                                    <PiSealPercentBold className="text-[40px] text-white" />
                                </div>
                                <div className='py-1 md:py-0'>
                                    <h3 className="uppercase font-semibold truncate w-[200px] md:w-[300px]">{coupon.name}</h3>
                                    <div className='text-caption text-price-old pt-1 pb-4'>
                                        Tối đa {formatNumber(coupon.max)} cho đơn hàng từ {formatNumber(coupon.min)}
                                    </div>
                                    <div className='text-caption text-blue-text'>
                                        HSD: {coupon.end_date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
};
export default MoreCoupon;
