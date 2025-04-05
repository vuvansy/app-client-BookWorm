'use client'

import { FaRegCircleUser } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { App, Dropdown, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { useCurrentApp } from "@/context/app.context";
import { sendRequest } from "@/utils/api";
import { useSession, signOut } from "next-auth/react";

const DropDowAccount = () => {
    const { message } = App.useApp();
    const { data: session } = useSession();
    console.log(session);
    const userType = session?.user?.type;
    // console.log("session CLIENT", session);

    const guestItems = [
        {
            label: <Link href="/auth/signin" className='font-medium text-caption text-center'>Đăng nhập</Link>,
            key: 'login',
        },
        {
            label: <Link href="/register" className='font-medium text-caption'>Đăng Ký</Link>,
            key: 'register',
        },
    ];

    let userItems = [
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
            label: (
                <div className="flex items-center gap-x-2">
                    <TbLogout className="text-[18px]" />
                    <label
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                            await signOut({ redirect: false });
                            message.success("Đăng xuất thành công!");
                        }}
                    >
                        Đăng xuất
                    </label>
                </div>
            ),
            key: 'logout',
        },
    ];

    if (userType === "SYSTEM") {
        userItems = [
            {
                label: (
                    <Link href="/edit-profile" className="flex items-center gap-x-2">
                        <FaRegUser className="text-[18px]" />
                        <span>Quản lý tài khoản</span>
                    </Link>
                ),
                key: 'edit-profile',
            },
            ...userItems,
            {
                label: (
                    <Link href="/change-password" className="flex items-center gap-x-2">
                        <RiUserSettingsLine className="text-[18px]" />
                        <span>Đổi mật khẩu</span>
                    </Link>
                ),
                key: 'change-password',
            },
        ];
    }

    const menuItems = session?.user ? userItems : guestItems;

    return (
        <>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
                overlayStyle={{ paddingTop: 8 }}
            >
                <Space className='!gap-x-[4px] cursor-pointer'>
                    <FaRegCircleUser className="icon-cart" />
                    {session && session.user?.fullName ? (
                        <span>{session.user.fullName}</span>
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
