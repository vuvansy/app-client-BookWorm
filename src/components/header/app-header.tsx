import { Dropdown, Space } from 'antd';
import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import Link from 'next/link';
import { FaCaretDown } from "react-icons/fa";
import Image from 'next/image';
import SearchForm from './form-search';
import HeaderNav from './header_nav';
import DropDowCart from './dropdow-cart';
import { sendRequest } from '@/utils/api'



const AppHeader = async () => {

    const res = await sendRequest<IBackendRes<IGenre[]>>({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
        method: "GET"

    })
    const categories = res.data ?? []
    const items = categories.map((category) => ({
        label: (
            <Link
                href={`/product/category/${category._id}`}
                className="font-medium text-caption text-center capitalize"
            >
                {category.name}
            </Link>
        ),
        key: `category/${category._id}`,
    }));

    return (
        <header>
            <div className='bg-red1 h-[36px] px-2 xl:px-0 flex justify-between items-center'>
                <div className='container flex justify-between text-white'>
                    <div className='flex items-center gap-x-[4px] cursor-pointer'>
                        <MdOutlineMail />
                        <div className='text-caption'>bookworm@gmail.com</div>
                    </div>
                    <div className='flex items-center gap-x-[10px] cursor-pointer'>
                        <FaFacebook />
                        <FaYoutube />
                        <FaInstagram />
                    </div>
                </div>
            </div>
            <div className='header-center'>
                <div className='bg-[#F4EDD3] h-[80px] lg:h-[60px] flex py-2 md:py-0 md:items-center px-2 xl:px-0'>
                    <div className='container flex justify-between items-center flex-wrap'>
                        <div className='order-1 basis-2/6 lg:order-1 lg:basis-3/12'>
                            <Link href={"/"} className='w-[200px]'>
                                <div className="relative w-[200px]">
                                    <Image
                                        src={"/icon/logo.png"}
                                        alt={'logo BookWorm'}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        priority
                                        className="w-full object-cover"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className='order-4 basis-10/12 lg:order-2 lg:basis-6/12'>
                            <SearchForm />
                        </div>
                        <div className='order-2 basis-4/6 lg:order-3 lg:basis-3/12 flex justify-end'>
                            <DropDowCart />
                        </div>
                        <div className='order-3 basis-1/12 cursor-pointer lg:hidden'>
                            <HeaderNav />
                        </div>
                    </div>
                </div >
                <div className='h-[40px] hidden lg:flex lg:items-centers shadow-xl'>
                    <div className='container'>
                        <ul className='flex justify-center items-center gap-x-8 text-caption'>
                            <li>
                                <Link href={'/'} className='px-[10px] py-[8px] capitalize'>Trang chủ</Link>
                            </li>
                            <li>
                                <Link href={'/about'} className='px-[10px] py-[8px] capitalize'>Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href={''} className="flex items-center px-[10px] py-[8px] capitalize">
                                    <Dropdown
                                        menu={{ items }}
                                        trigger={['click']}
                                        placement="bottom"
                                        overlayStyle={{ paddingTop: 6 }} // Đẩy xuống dưới
                                    >
                                        <Space>
                                            <span>Sản phẩm</span>
                                            <FaCaretDown />
                                        </Space>
                                    </Dropdown>
                                </Link>
                            </li>
                            <li>
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Cửa hàng</Link>
                            </li>
                            <li >
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Liên hệ</Link>
                            </li>
                            <li>
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Tuyển dụng</Link>
                            </li>
                            <li>
                                <Link href={'/news'} className='px-[10px] py-[8px] capitalize'>Tin tức</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader