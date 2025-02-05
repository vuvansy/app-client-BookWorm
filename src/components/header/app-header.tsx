import { Badge, Dropdown, Popover, Space } from 'antd';
import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { LuPackageSearch } from "react-icons/lu";
import { PiShoppingCartBold } from "react-icons/pi";
import Link from 'next/link';

import { FaCaretDown } from "react-icons/fa";
import Image from 'next/image';
import SearchForm from './form-search';
import DropDowAccount from './dropdow-account';


const categories = [
    { id: 1, name: 'Sách Tư Duy - Kỹ Năng' },
    { id: 2, name: 'Sách Kinh Tế - Tài Chính' },
    { id: 3, name: 'Sách Văn Học' },
    { id: 4, name: 'Sách Khoa Học - Giáo dục' },
    { id: 5, name: 'Sách Văn Hóa - Nghệ Thuật' },
];

const content = (
    <>
        <div>
            <div className='flex pb-2'>
                <Link href={"/"} className='block relative aspect-square w-[68px] h-[68px]'>
                    <Image src={"/books/sachlichsu.webp"}
                        alt=""
                        fill
                        sizes="100"
                        className="w-full aspect-[3/4] object-contain" />
                </Link>
                <div className='ml-2 w-[252px]'>
                    <Link href={'/'} className='text-bg-text hover:text-bg-text'>Nhóc Miko! Cô Bé Nhí Nhảnh - Tập 38</Link>
                    <div className='flex items-center gap-x-2 mt-1'>
                        <span className='text-body-bold'>36000</span>
                        <span className='text-gray-1 text-body1'>x2</span>
                    </div>
                </div>
            </div>
            <div className='flex pb-2'>
                <Link href={"/"} className='block relative aspect-square w-[68px] h-[68px]'>
                    <Image src={"/books/tet-oi-tet-dau-roi.webp"}
                        alt=""
                        fill
                        sizes="100"
                        className="w-full aspect-[3/4] object-contain" />
                </Link>
                <div className='ml-2 w-[252px]'>
                    <Link href={'/'} className='text-bg-text hover:text-bg-text'>
                        Quiet: The Power of Introverts in a World That Can't Stop Talking
                    </Link>
                    <div className='flex items-center gap-x-2 mt-1'>
                        <span className='text-body-bold'>36000</span>
                        <span className='text-gray-1 text-body1'>x2</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center pt-[16px] pb-[4px]'>
            <div>
                <p>Tổng cộng</p>
                <span className='text-red1 !text-body-bold'>{(1430310).toLocaleString()} đ</span>
            </div>
            <Link href={'/cart'}
                className='w-[186px] h-[40px] border-[2px] border-red1 rounded-lg bg-red1 text-white text-caption-bold flex justify-center items-center hover:text-white'>
                Xem giỏ hàng
            </Link>
        </div>
    </>

);

const AppHeader = () => {

    const items = categories.map((category) => ({
        label: (
            <Link
                href={`category/${category.id}`}
                className="font-medium text-caption text-center"
            >
                {category.name}
            </Link>
        ),
        key: `category/${category.id}`,
    }));

    return (
        <header>
            <div className='bg-red1 h-[36px] flex justify-between items-center'>
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
                <div className='bg-[#F4EDD3] h-[60px] flex items-center'>
                    <div className='container flex justify-between items-center'>
                        <div className='basis-3/12'>
                            <Link href={"/"}>BookWorm</Link>
                        </div>
                        <div className='basis-6/12'>
                            <SearchForm />
                        </div>
                        <div className='basis-3/12 flex justify-end'>
                            <ul className='flex items-center gap-x-[26px]'>
                                <li className='cursor-pointer'>
                                    <Popover
                                        placement="bottom"
                                        rootClassName="popover-carts"
                                        title={
                                            <div className="flex items-center gap-x-2 py-[10px] border-b-[1px] !text-body-bold">
                                                <BsCart3 className='w-[18px] h-[18px]' />
                                                <span>Giỏ hàng (10)</span>
                                            </div>
                                        }
                                        content={content}
                                        arrow={true}>
                                        <Badge
                                            // count={carts?.length ?? 0}
                                            count={10}
                                            size={"small"}
                                            showZero
                                        >
                                            <PiShoppingCartBold className='icon-cart top-[4px]' />
                                        </Badge>
                                    </Popover>
                                </li>
                                <li className='cursor-pointer'>
                                    <LuPackageSearch className='icon-cart' />
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    <DropDowAccount />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
                <div className='h-[40px] flex items-center'>
                    <div className='container'>
                        <ul className='flex justify-center items-center gap-x-8 text-caption'>
                            <li>
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Trang chủ</Link>
                            </li>
                            <li>
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Giới thiệu</Link>
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
                                <Link href={''} className='px-[10px] py-[8px] capitalize'>Tin tức</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader