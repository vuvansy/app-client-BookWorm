import React from 'react';
import { Breadcrumb, ConfigProvider, Rate } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { HomeOutlined } from '@ant-design/icons';
import QuantitySelector from './quantity';
import ListCoupon from './listCoupon';
import ProductDescription from './description';
import CustomerReviews from './review';
import MoreCoupon from './moreCoupon';
import GalleryComponent from './gallery';
import ListRelated from '@/components/list-related';
import { sendRequest } from '@/utils/api';

interface Product {
    id: string;
    name: string;
    price_old: number;
    price_new: number;
    supplier: string;//Nhà cung cấp
    author: string;// Tác giả
    translator: string;//Người dịch
    publisher: string;//Nhà xuất bản
    year_publish: number;//Năm xuất bản
    weight: number;//Trọng lượng
    size: string;//Kích thước
    page_number: number;//Số trang
    book_cover: string;//Hình thức bìa

}

const Product: Product = {
    id: '8935086856000',
    name: 'Bạn Là Ai Giữa Muôn Vàn Phong Cách Sống',
    price_old: 124000,
    price_new: 62000,
    supplier: 'FRIST NEW',
    author: 'J Krishnamurti',
    translator: 'Huỳnh Hiếu Thuận',
    publisher: 'Hồng Đức',
    year_publish: 2022,
    weight: 339,
    size: '20.5 x 14.5 x 1.4',
    page_number: 304,
    book_cover: 'Bìa mềm',

}

const products = [
    {
        id: "1",
        image: "1740465133117-375555400.jpg",
        name: "Trốn Lên Mái Nhà Để Khóc - Tặng Kèm Bookmark",
        rating: 4.5,
        price_new: 78850,
        price_old: 95000,
    },
    {
        id: "2",
        image: "1740465133117-375555400.jpg",
        name: "Thuật Thao Túng - Góc Tối Ẩn Sau Mỗi Câu Nói",
        rating: 4,
        price_new: 97300,
        price_old: 139000,
    },
    {
        id: "3",
        image: "1740465133117-375555400.jpg",
        name: "Ôn Luyện Thi Tốt Nghiệp THPT Từ Năm 2025 - Môn Lịch Sử (Theo Chương Trình GDPT Mới)",
        rating: 3,
        price_new: 97300,
        price_old: 139000,
    },
    {
        id: "4",
        image: "1740465133117-375555400.jpg",
        name: "The Angel Next Door Spoils Me Rotten 2",
        price_new: 201600,
        price_old: 224000,
        rating: 4.5,
    },
    {
        id: "5",
        image: "1740465133117-375555400.jpg",
        name: "The Things You Can See Only When You Slow Down",
        price_new: 502200,
        price_old: 558000,
        rating: 4.5,
    },
    {
        id: "6",
        image: "1740465133117-375555400.jpg",
        name: "The Things You Can See Only When You Slow Down",
        price_new: 502200,
        price_old: 558000,
        rating: 4.5,
    },
    {
        id: "7",
        image: "1740465133117-375555400.jpg",
        name: "Hoa Học Trò - Số 1451 - Năm 2025 Gọi Tên Những Ngành Học Nào Lên Xu Hướng?",
        price_new: 502200,
        price_old: 558000,
    },

];

const Discount = (oldPrice: number, newPrice: number): number => {
    if (oldPrice <= 0) return 0;
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(discount);
};

const formatNumber = (num: number): string => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

import type { Metadata, ResolvingMetadata } from 'next'

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
    const discount = Discount(Product.price_old, Product.price_new);

    const res = await sendRequest<IBackendRes<IBookTable>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${params.id}`,
        method: "GET"
    })
    const currentBook = res?.data || null;

    const resBooksByGenreAPI = await sendRequest<IBackendRes<IBookTable[]>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${currentBook?._id}/genre/${currentBook?.id_genre._id}`,
        method: "GET"
    })
    const dataBooksByGenreAPI = resBooksByGenreAPI?.data || null;

    return (
        <div className="bg-bg-main">
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
                <div className=" flex justify-between gap-x-4">
                    <div className="w-[40%] max-h-[750px] bg-white sticky top-4 rounded-lg p-4">
                        <GalleryComponent currentBook={currentBook} />
                        <div>
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
                    <div className="w-[60%] flex flex-wrap gap-y-4">
                        <div className="w-full px-4 pt-4 bg-white rounded-lg">
                            <div className=" flex items-center text-heading4-bold leading-[30px]">{Product.name}</div>
                            <div className="flex justify-between my-1">
                                <div className=" ">
                                    <div className="leading-[30px] flex items-center gap-x-1 text-caption-light">Nhà cung cấp :<div className="text-caption-bold">{Product.supplier}</div></div>
                                    <div className="leading-[30px] items-center flex gap-x-1 text-caption-light">Hình thức bìa :<div className="text-caption-bold">{Product.book_cover}</div></div>

                                </div>
                                <div className=" ">
                                    <div className="leading-[30px] flex items-center gap-x-1 text-caption-light">Tác giả :<div className="text-caption-bold">{Product.author}</div></div>
                                    <div className="leading-[30px] items-center flex gap-x-1 text-caption-light">Nhà xuất bản :<div className="text-caption-bold">{Product.publisher}</div></div>
                                </div>
                            </div>
                            <div className="py-[5px] flex gap-x-3 items-center">
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
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                    </ConfigProvider>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-caption-light border-r-2 border-gray-300 pr-4 text-yellow-1">
                                        (2 đánh giá)
                                    </div>
                                    <div className="text-caption-light pl-4">
                                        Đã bán {formatNumber(2200)}
                                    </div>
                                </div>
                            </div>
                            <div className="py-1 flex items-center gap-x-3">
                                <div className="text-price-special text-heading2-bold">
                                    {Product.price_new}đ
                                </div>
                                <div className="text-caption-light text-price-old line-through">
                                    {Product.price_old}đ
                                </div>
                                <div className="px-[2px] leading-[22px] rounded-md bg-red1 font-semibold text-info flex items-center justify-center text-white">
                                    -{discount}%
                                </div>
                            </div>

                        </div>
                        <div className="w-full px-4 pt-4 bg-white rounded-lg">
                            <div className="leading-[30px] flex items-center gap-x-1 mb-4">
                                <div className="text-sub-heading-bold">Ưu đãi liên quan</div>
                                <MoreCoupon />
                            </div>
                            <ListCoupon />
                            <div className=' flex items-center gap-x-8 my-4'>
                                <div className='text-sub-heading'>Số lượng :</div>
                                <QuantitySelector currentBook={currentBook} />
                            </div>
                            <div className='pb-4 flex gap-x-2'>
                                <button className='w-[220px] h-[45px] rounded-md bg-red1 text-white text-body-bold flex items-center justify-center gap-x-2'><FaShoppingCart className='w-[25px] h-[25px]' />Mua ngay</button>
                                <button className='w-[220px] h-[45px] rounded-md border border-red1 text-red1 text-body-bold flex items-center justify-center gap-x-2'><FaCartPlus className='w-[25px] h-[25px]' />Thêm vào giỏ hàng</button>
                            </div>

                        </div>
                        <div className="w-full pt-4 px-4 bg-white rounded-lg">
                            <div className="flex items-center text-[18px] font-semibold leading-[24px]">Thông tin chi tiết</div>
                            <div className="py-4 flex items-center justify-center  ">
                                <div className="w-full">
                                    <div className="grid grid-cols-2">
                                        <div className="divide-y divide-bg-main">
                                            <div className="text-price-old text-caption py-2">Mã hàng</div>
                                            <div className="text-price-old text-caption py-2">Tên Nhà Cung Cấp</div>
                                            <div className="text-price-old text-caption py-2">Tác giả</div>
                                            <div className="text-price-old text-caption py-2">Người Dịch</div>
                                            <div className="text-price-old text-caption py-2">NXB</div>
                                            <div className="text-price-old text-caption py-2">Năm XB</div>
                                            <div className="text-price-old text-caption py-2">Trọng lượng (gr)</div>
                                            <div className="text-price-old text-caption py-2">Kích Thước Bao Bì</div>
                                            <div className="text-price-old text-caption py-2">Số trang</div>
                                            <div className="text-price-old text-caption py-2">Hình thức</div>
                                        </div>
                                        <div className="divide-y divide-bg-main">
                                            <div className="text-bg-text text-caption py-2">{Product.id}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.supplier}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.author}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.translator}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.publisher}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.year_publish}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.weight}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.size}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.page_number}</div>
                                            <div className="text-bg-text text-caption py-2">{Product.book_cover}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full py-2 flex flex-col gap-y-2">
                                <div className='text-caption text-black'>Giá sản phẩm trên BookWorm.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...</div>
                                <div className='text-caption text-red1'>Chính sách khuyến mãi trên BookWorm.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <ProductDescription />
                <CustomerReviews />
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

