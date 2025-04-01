import React from 'react';
import { Breadcrumb, ConfigProvider, Rate } from "antd";

import QuantitySelector from './quantity';
import ListCoupon from './listCoupon';
import ProductDescription from './description';
import CustomerReviews from './review';
import GalleryComponent from './gallery';
import ListRelated from '@/components/list-related';
import { sendRequest } from '@/utils/api';

import type { Metadata, ResolvingMetadata } from 'next'
import BookInfo from './bookInfo';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id
    const productById = await sendRequest<IBackendRes<IBookTable>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${id}`,
        method: "GET"
    })
    return {
        title: productById?.data?.name,
    }
}


const ProductDetailPage = async (props: Props) => {
    const { params } = props;


    const res = await sendRequest<IBackendRes<IBookTable>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${params.id}`,
        method: "GET"
    })
    const currentBook = res?.data || null;

    if (!currentBook) {
        return <div>Book not found</div>;
    }

    const authorIds = currentBook.authors?.map((author) => author._id) || []; 

    if (authorIds.length === 0) {
        return <div>No authors found for this book</div>;
    }

    const resBooksByGenreAPI = await sendRequest<IBackendRes<IBookTable[]>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${currentBook._id}/genre/${currentBook.id_genre._id}/author/${authorIds.join(',')}`,
        method: "GET"
    });
    const dataBooksByGenreAPI = resBooksByGenreAPI?.data || null;

    return (
        <div className="bg-bg-main px-2 xl:px-0">
            <div className="container pt-[8px]">
                <Breadcrumb
                    items={[
                        {
                            title: "Trang Chủ"

                        },
                        {
                            title: (
                                <div className='capitalize'>{currentBook?.id_genre.name}</div>
                            ),
                        },
                        {
                            title: (
                                <div className='w-full max-w-[200px] truncate'>{currentBook?.name}</div>
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
                                <img src="/icon/ico_truck_v2.webp" alt="" className='w-[18px] h-[18px]' />
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Thời gian giao hàng:</p>
                                    <p>Giao nhanh và uy tín</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-1 mb-[14px]'>
                                <img src="/icon/ico_transfer_v2.webp" alt="" className='w-[18px] h-[18px]' />
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Chính sánh đổi trả:</p>
                                    <p>Đổi trả miễn phí toàn quốc</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-1 mb-[14px]'>
                                <img src="/icon/ico_shop_v2.webp" alt="" className='w-[18px] h-[18px]' />
                                <div className='flex gap-x-1 text-caption'>
                                    <p className='font-semibold'>Chính sách khách sỉ:</p>
                                    <p>Ưu đãi khi mua số lượng lớn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BookInfo currentBook={currentBook} />
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

export default ProductDetailPage;
