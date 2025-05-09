'use client'
import GalleryComponent from '@/app/product/[id]/gallery';
import ListCoupon from './listCoupon';
import QuantitySelector from './quantity';
import { Breadcrumb, ConfigProvider, Rate, Spin } from 'antd';
import React from 'react'
import useSWR from 'swr';
import ProductDescription from './description';
import CustomerReviews from './review';
import ListRelated from '@/components/list-related';
import Image from 'next/image';
import Loading from '@/app/product/[id]/loading';

interface ReviewResponse {
    data: IReview[];
    average?: number;
    count?: number;
}

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BookInfo(props: IProps) {
    const { params } = props;

    const { data, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${params.id}`,
        fetcher
    );

    const currentBook: IBookTable | null = data?.data || null;

    const genreAuthorUrl = currentBook && currentBook._id && currentBook.id_genre?._id && currentBook.authors?.length
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${currentBook._id}/genre/${currentBook.id_genre._id}/author/${currentBook.authors.map(a => a._id).join(',')}`
        : null;

    const reviewUrl = currentBook && currentBook._id
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/review/book/${currentBook._id}`
        : null;

    const { data: booksByGenreData } = useSWR(genreAuthorUrl, fetcher);
    const { data: reviewData } = useSWR<ReviewResponse>(reviewUrl, fetcher);

    if (!currentBook) {
        return (
            <Loading />
        )
    }

    if (!currentBook.authors || currentBook.authors.length === 0) {
        return <div>No authors found for this book</div>;
    }

    const dataBooksByGenreAPI: IBookTable[] = booksByGenreData?.data || [];
    const authorsNames = currentBook.authors.map(author => author.name).join(', ');

    const discount = (currentBook.price_new && currentBook.price_old && currentBook.price_new < currentBook.price_old)
        ? Math.round(((currentBook.price_old - currentBook.price_new) / currentBook.price_old) * 100)
        : null;

    const calculateAverageRating = (): number => {
        if (!reviewData?.data || reviewData.data.length === 0) return 0;

        const sum = reviewData.data.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviewData.data.length;
    };

    const averageRating = reviewData?.average !== undefined ?
        reviewData.average :
        calculateAverageRating();
    const countReview = reviewData?.count !== undefined ?
        reviewData.count :
        (reviewData?.data?.length || 0);

    return (
        <div>
            <div className="container pt-[8px]">
                <Breadcrumb
                    items={[
                        {
                            title: "Trang Chủ"

                        },
                        {
                            title: (
                                <div className='capitalize'>{currentBook.id_genre.name}</div>
                            ),
                        },
                        {
                            title: (
                                <div className='w-full max-w-[200px] truncate'>{currentBook.name}</div>
                            ),
                        },
                    ]}
                />
            </div>
            <div className="container pt-[8px] pb-5">
                <div className=" flex flex-col lg:flex-row justify-between gap-x-4">
                    <div className="w-full lg:w-[40%] max-h-[740px] bg-white lg:sticky lg:top-4 rounded-lg p-4">
                        <GalleryComponent currentBook={currentBook} />
                        <div className='hidden lg:block'>
                            <h3 className='text-body-bold my-[14px]'>Chính sách ưu đãi của BookWorm</h3>
                            <div className='flex items-center gap-x-1 mb-[14px]'>
                                <div className='relative w-[18px] h-[18px]'>
                                    <Image src="/icon/ico_truck_v2.webp" alt="" width={0} height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        priority
                                        className="w-full object-cover" />
                                </div>
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Thời gian giao hàng:</p>
                                    <p>Giao nhanh và uy tín</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-1 mb-[14px]'>
                                <div className='relative w-[18px] h-[18px]'>
                                    <Image src="/icon/ico_transfer_v2.webp" alt="" width={0} height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        priority
                                        className="w-full object-cover" />
                                </div>
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Chính sánh đổi trả:</p>
                                    <p>Đổi trả miễn phí toàn quốc</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-1 mb-[14px]'>
                                <div className='relative w-[18px] h-[18px]'>
                                    <Image src="/icon/ico_shop_v2.webp" alt="" width={0} height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        priority
                                        className="w-full object-cover" />
                                </div>
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Chính sách khách sỉ:</p>
                                    <p>Ưu đãi khi mua số lượng lớn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] flex flex-wrap gap-y-4">
                        <div className="w-full px-4 pt-4 bg-white rounded-lg">
                            <div className=" flex items-center text-heading4-bold leading-[30px]">{currentBook.name}</div>
                            <div className="hidden md:flex md:flex-row md:justify-between my-1">
                                <div>
                                    <div className="leading-[30px] flex items-center gap-x-1 text-caption-light">Tác giả :<div className="text-caption-bold">{authorsNames}</div></div>
                                    <div className="leading-[30px] items-center flex gap-x-1 text-caption-light">Nhà xuất bản :<div className="text-caption-bold">{currentBook.publishers}</div></div>
                                </div>
                                <div>
                                    <div className="leading-[30px] flex items-center gap-x-1 text-caption-light">Hình thức bìa :<div className="text-caption-bold">{currentBook.book_cover}</div></div>
                                    <div className="leading-[30px] items-center flex gap-x-1 text-caption-light">Năm xuất bản :<div className="text-caption-bold">{currentBook.year}</div></div>
                                </div>

                            </div>
                            <div className="py-[5px] flex flex-col gap-y-2 md:flex-row md:gap-x-3 md:items-center">
                                <div className=" flex items-center">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Rate: {
                                                    starSize: 14,
                                                },
                                            },
                                            token: {
                                                marginXS: 2,
                                            },
                                        }}
                                    >
                                        <Rate disabled allowHalf value={averageRating} />
                                    </ConfigProvider>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-caption-light border-r-2 border-gray-300 pr-4 text-yellow-1">
                                        ({countReview} đánh giá)
                                    </div>
                                    <div className="text-caption-light pl-4 border-r-2 border-gray-300 pr-4">
                                        Số lượng: {currentBook.quantity}
                                    </div>
                                    <div className="text-caption-light text-[#127daf] pl-4">
                                        {currentBook.quantity ? `Còn hàng ` : <span className="text-[#e30e48]">Hết hàng</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="py-1 flex items-center gap-x-3">
                                <div className="text-price-special text-heading2-bold">
                                    {new Intl.NumberFormat('vi-VN').format(currentBook.price_new ?? 0)} đ
                                </div>
                                <div className="text-caption-light text-price-old line-through">
                                    {new Intl.NumberFormat('vi-VN').format(currentBook.price_old ?? 0)} đ
                                </div>
                                {discount !== null && (
                                    <div className="px-[2px] leading-[22px] rounded-md bg-red1 font-semibold text-info flex items-center justify-center text-white">
                                        <span className="text-white lg:text-body-bold text-caption-bold">
                                            -{discount}%
                                        </span>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="w-full px-4 pt-4 bg-white rounded-lg">
                            <ListCoupon />
                            <QuantitySelector currentBook={currentBook} />
                        </div>
                        <div className="w-full pt-4 px-4 bg-white rounded-lg">
                            <div className="flex items-center text-[18px] font-semibold leading-[24px]">Thông tin chi tiết</div>
                            <div className="py-4 flex items-center justify-center  ">
                                <div className="w-full">
                                    <div className='divide-y divide-bg-main'>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Mã hàng</span>
                                            <span className='text-bg-text text-caption truncate'>{currentBook._id}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Tác giả</span>
                                            <span className='text-bg-text text-caption'>{authorsNames}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>NXB</span>
                                            <span className='text-bg-text text-caption'>{currentBook.publishers}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Năm XB</span>
                                            <span className='text-bg-text text-caption'>{currentBook.year}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Trọng lượng (gr)</span>
                                            <span className='text-bg-text text-caption'>{currentBook.weight}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Kích Thước Bao Bì</span>
                                            <span className='text-bg-text text-caption'>{currentBook.size}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Số trang</span>
                                            <span className='text-bg-text text-caption'>{currentBook.page_count}</span>
                                        </div>
                                        <div className='grid grid-cols-2 py-2'>
                                            <span className='text-price-old text-caption flex items-center'>Hình thức</span>
                                            <span className='text-bg-text text-caption'>{currentBook.book_cover}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full py-2 flex flex-col gap-y-2">
                                <div className='text-caption text-black'>Giá sản phẩm trên BookWorm.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...</div>
                                <div className='text-caption text-red1'>Chính sách khuyến mãi trên BookWorm.com không áp dụng cho Hệ thống Nhà sách BookWorm trên toàn quốc.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <ProductDescription currentBook={currentBook} />
                <CustomerReviews currentBook={currentBook} />
            </div>
            <div className='container mt-5 pb-[30px] bg-white rounded-lg'>
                <div className='py-[15px] pl-[15px]'>
                    <h2 className='font-semibold text-[17px]'>SẢN PHẨM LIÊN QUAN</h2>
                </div>
                <ListRelated booksByGenreAPI={dataBooksByGenreAPI} />
            </div>
        </div>
    )
}
