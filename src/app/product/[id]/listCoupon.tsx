'use client'
import { sendRequest } from '@/utils/api';
import { App, ConfigProvider, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { GrFormNext } from "react-icons/gr";
import { PiSealPercentBold } from 'react-icons/pi';
import { PiSealPercentLight } from "react-icons/pi";


const ListCoupon = () => {
    const { message, modal, notification } = App.useApp();
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getLatestCoupons = (coupons: ICoupon[]): ICoupon[] => {
        return coupons
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4);
    };
    const latestCoupons = getLatestCoupons(coupons);
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isOpenList, setIsOpenList] = useState(false);

    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);
                const res = await sendRequest<IBackendRes<ICoupon[]>>({
                    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/coupon`,
                    method: 'GET',
                });

                if (res.data) {
                    setCoupons(res.data);
                }
            } catch (error) {
                message.error('Lỗi khi lấy dữ liệu mã giảm giá');
                console.log('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [message]);

    const showModalMore = () => {

        setIsOpenMore(true);
    };

    const handleOk = () => {
        setIsOpenMore(false);
        setIsOpenList(false);
    };

    const handleCancel = () => {
        setIsOpenMore(false);
        setIsOpenList(false);
    };
    const showModalList = (coupon: ICoupon) => {
        setSelectedCoupon(coupon);
        setIsOpenList(true);
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
            <div className="leading-[30px] flex items-center gap-x-1 mb-4">
                <div className="text-sub-heading-bold">Ưu đãi liên quan</div>
                <div>
                    <div onClick={showModalMore} className="w-[115px] flex items-center justify-center text-caption text-blue-text-bold cursor-pointer">Xem thêm <GrFormNext /> </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgMask: 'rgba(0,0,0,0.3)',
                            },
                        }}
                    >
                        <Modal

                            open={isOpenMore}
                            onCancel={handleCancel}
                            maskClosable={true}
                            footer={null}  // Ẩn phần footer
                        >
                            <div>
                                <div className="flex items-center">
                                    <p className="text-info-bold">Mã giảm giá</p>
                                </div>
                                <div className="mt-3 max-h-[350px] overflow-y-auto">
                                    {coupons.map((couponMore, index) => (
                                        <div key={index} className="flex items-center gap-x-5 rounded-lg shadow-custom mb-2">
                                            <div className="bg-yellow-1 h-[100px] w-[100px] rounded-lg flex justify-center items-center">
                                                <PiSealPercentBold className="text-[40px] text-white" />
                                            </div>
                                            <div className='py-1 md:py-0'>
                                                <h3 className="uppercase font-semibold truncate w-[200px] md:w-[300px]">Mã Giảm {couponMore.value}%</h3>
                                                <div className='text-caption text-price-old pt-1 pb-4'>
                                                    {couponMore.description}
                                                </div>
                                                <div className='text-caption text-blue-text'>
                                                    HSD: {couponMore.end_date ? new Date(couponMore.end_date).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Modal>
                    </ConfigProvider>
                </div>
            </div>
            <div className='w-full hidden lg:flex lg:flex-wrap items-center gap-4'>
                {latestCoupons.map((couponlist, index) => (
                    <div key={index} className='flex-1 min-w-[150px]'>
                        <div className='w-[160px] h-[45px] border border-gray-300 rounded-lg flex items-center cursor-pointer' onClick={() => showModalList(couponlist)}>
                            <div className='w-7 h-8 m-2 bg-yellow-1 flex items-center justify-center rounded-sm'>
                                <div className='w-5 h-5  bg-white rounded-full text-yellow-1'>
                                    <PiSealPercentLight className='w-5 h-5' />
                                </div>
                            </div>
                            <div className='w-[110px] p-2 text-caption truncate'>Mã giảm {couponlist.value}%</div>
                        </div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgMask: 'rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Modal title="Mã Giảm Giá" open={isOpenList} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                {selectedCoupon && (
                                    <div>
                                        <div className='mb-2 px-4 py-2 bg-yellow-1 bg-opacity-25 text-yellow-3 rounded-md'>
                                            {/* Mã giảm giá {selectedCoupon.value} Tối đa {formatNumber(selectedCoupon.max_value)} */}
                                            {selectedCoupon.description}
                                        </div>
                                        {/* <div>- Áp dụng cho đơn hàng có tổng giá trị đơn hàng từ {formatNumber(selectedCoupon.min_total)}</div> */}
                                        <div>- Hạn sử dụng đến hết ngày {selectedCoupon.end_date ? new Date(selectedCoupon.end_date).toLocaleDateString() : 'N/A'}</div>
                                    </div>

                                )}
                            </Modal>
                        </ConfigProvider>
                    </div>
                ))}
            </div>
        </div>


    )
};
export default ListCoupon;
