'use client'

import DropDowAccount from "./dropdow-account";
import { ConfigProvider, Drawer, Dropdown, Menu, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";


const categories = [
    { id: 1, name: 'Sách Tư Duy - Kỹ Năng' },
    { id: 2, name: 'Sách Kinh Tế - Tài Chính' },
    { id: 3, name: 'Sách Văn Học' },
    { id: 4, name: 'Sách Khoa Học - Giáo dục' },
    { id: 5, name: 'Sách Văn Hóa - Nghệ Thuật' },
];

const HeaderNav = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const showMenu = () => {
        setOpenMenu(true);
    };

    const onClose = () => {
        setOpenMenu(false);
    };
    const handleDrawerClick = (e: React.MouseEvent<HTMLUListElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A') {
            setOpenMenu(false);
        }
    };
    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };
    const items = categories.map((category) => ({
        label: (
            <Link
                href={`product/category/${category.id}`}
                className="font-medium text-caption text-center"
            >
                {category.name}
            </Link>
        ),
        key: `product/category/${category.id}`,
    }));
    return (
        <div>
            <div className="flex justify-center items-center" onClick={showMenu}>
                <IoMenu className='w-[30px] h-[30px]' />
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        paddingLG: 0,
                        colorBgMask: 'rgba(0,0,0,0.1)',
                    },
                }}
            >
                <Drawer onClose={onClose} open={openMenu} width={260} placement="left" closable={false}>
                    <ul className='w-full flex flex-col justify-center items-center' onClick={handleDrawerClick}>
                        <li className="w-full flex justify-start items-center">
                            <Link href={'/'} className='px-[10px] py-[8px] capitalize'>Trang chủ</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={'/about'} className='px-[10px] py-[8px] capitalize'>Giới thiệu</Link>
                        </li>
                        <li className="w-full flex flex-wrap justify-start items-center">
                            <Link href={''} className="flex items-center px-[10px] py-[8px] capitalize">
                                <Space onClick={toggleSubMenu}>
                                    <span>Sản phẩm</span>
                                    <FaCaretDown />
                                </Space>
                            </Link>
                            {showSubMenu && (
                                <Menu
                                    mode="vertical"
                                    items={items}
                                    style={{ width: 260 }}
                                />
                            )}

                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={''} className='px-[10px] py-[8px] capitalize'>Cửa hàng</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={''} className='px-[10px] py-[8px] capitalize'>Liên hệ</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={''} className='px-[10px] py-[8px] capitalize'>Tuyển dụng</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={'/news'} className='px-[10px] py-[8px] capitalize'>Tin tức</Link>
                        </li>
                    </ul>
                </Drawer>
            </ConfigProvider>
        </div>

    );
};

export default HeaderNav;