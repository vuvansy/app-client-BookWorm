'use client'

import { sendRequest } from "@/utils/api";
import DropDowAccount from "./dropdow-account";
import { ConfigProvider, Drawer, Dropdown, Menu, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";


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
    const [categories, setCategories] = useState<IGenre[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await sendRequest<IBackendRes<IGenre[]>>({
                    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
                    method: "GET"
                });
                setCategories(res.data ?? []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);
    const items = categories.map((category) => ({
        label: (
            <Link
                href={`product/category/${category._id}`}
                className="font-medium text-caption text-center"
            >
                {category.name}
            </Link>
        ),
        key: `product/category/${category._id}`,
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
                            <Link href={'/shop'} className='px-[10px] py-[8px] capitalize'>Cửa hàng</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={'/contact'} className='px-[10px] py-[8px] capitalize'>Liên hệ</Link>
                        </li>
                        <li className="w-full flex justify-start items-center">
                            <Link href={'/recruitment'} className='px-[10px] py-[8px] capitalize'>Tuyển dụng</Link>
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