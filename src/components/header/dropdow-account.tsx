'use client'

import { FaRegCircleUser } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";

const DropDowAccount = () => {
    const { isAuthenticated, user, setUser, setIsAuthenticated } = useCurrentApp();

    useEffect(() => {
        const fetchAccount = async () => {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) return;

            const res = await sendRequest<IBackendRes<IFetchAccount>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/account`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            if (res.data) {
                setUser(res.data.user)
                setIsAuthenticated(true);
            }
        }
        fetchAccount();
    }, [])


    const handleLogout = async () => {
        //todo
        // Logic xử lý đăng xuất
        alert("Bạn đã đăng xuất!");
        setIsAuthenticated(false); // Cập nhật trạng thái khi đăng xuất
        // setUser(null); // Xóa thông tin người dùng
    }

    const guestItems = [
        {
            label: <Link href="/login" className='font-medium text-caption text-center'>Đăng nhập</Link>,
            key: 'login',
        },
        {
            label: <Link href="/register" className='font-medium text-caption'>Đăng Ký</Link>,
            key: 'register',
        },
    ];

    const userItems = [
        {
            label: (
                <Link href="/edit-profile" className="flex items-center gap-x-2">
                    <FaRegUser className="text-[18px]" />
                    <span>Quản lý tài khoản</span>
                </Link>
            ),
            key: 'edit-profile',
        },
        {
            label: (<Link href="/profile/order" className="flex items-center gap-x-2">
                <MdOutlineBookmarks className="text-[18px]" />
                <span>Đơn hàng của tôi</span>
            </Link>),
            key: 'order',
        },
        {
            label: (<Link href="/profile/wishlist" className="flex items-center gap-x-2">
                <MdOutlineFavoriteBorder className="text-[18px]" />
                <span>Book yêu thích</span>
            </Link>),
            key: 'wishlist',
        },
        {
            label: (<Link href="/change-password" className="flex items-center gap-x-2">
                <RiUserSettingsLine className="text-[18px]" />
                <span>Đổi mật khẩu</span>
            </Link>),
            key: 'change-password',
        },
        {
            label: (
                <div className="flex items-center gap-x-2">
                    <TbLogout className="text-[18px]" />
                    <label
                        style={{ cursor: 'pointer' }}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </label>
                </div>
            ),
            key: 'logout',
        },
    ];

    const menuItems = isAuthenticated ? userItems : guestItems;

    return (
        <>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
                overlayStyle={{ paddingTop: 8 }}
            >
                <Space className='!gap-x-[4px]'>
                    <FaRegCircleUser className="icon-cart" />
                    {isAuthenticated && user?.fullName ? (
                        <span>{user.fullName}</span>
                    ) : (
                        <span>Tài Khoản</span>
                    )}
                    <FaCaretDown />
                </Space>
            </Dropdown>
        </>

    )
}

export default DropDowAccount
