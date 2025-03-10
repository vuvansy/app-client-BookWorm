'use client'

import { FaRegCircleUser } from "react-icons/fa6";
import { FaCaretDown, FaUsersCog } from "react-icons/fa";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { login, logout } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DropDowAccount = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<{ fullName: string, role: string } | null>(null);

    useEffect(() => {
        const storeUser = localStorage.getItem('user');
        if (storeUser) {
            const dataUser = JSON.parse(storeUser);
            setUser(dataUser);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);



    const handleLogout = async () => {
        //todo
        // Logic xử lý đăng xuất
        alert("Bạn đã đăng xuất!");
        setIsAuthenticated(false); // Cập nhật trạng thái khi đăng xuất
        setUser(null); // Xóa thông tin người dùng
        dispatch(logout());
    }
    const saveRedirectUrl = () => {
        localStorage.setItem('redirectUrl', window.location.href);
    };

    const guestItems = [
        {
            label: <Link href="/login" className='font-medium text-caption text-center' onClick={saveRedirectUrl}>Đăng nhập</Link>,
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

    //Logic thêm khi user có role === 'ADMIN'
    if (user?.role === 'ADMIN') {
        userItems.unshift({
            label: (<Link href="/history" className="flex items-center gap-x-2">
                <FaUsersCog className="text-[18px]" />
                <span>Trang quản trị</span>
            </Link>),
            key: 'admin',
        })
    }

    const menuItems = isAuthenticated ? userItems : guestItems;

    return (
        <>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
                overlayStyle={{ paddingTop: 8 }} // Đẩy xuống dưới
            >
                <Space className='!gap-x-[4px]'>
                    {isAuthenticated && user ? (
                        <>
                            <FaRegCircleUser className="icon-cart" />
                            <span>{user.fullName}</span>
                            <FaCaretDown />
                        </>
                    ) : (
                        <>
                            <FaRegCircleUser className="icon-cart" />
                            <span>Tài Khoản</span>
                            <FaCaretDown />
                        </>
                    )}
                </Space>
            </Dropdown>
        </>

    )
}

export default DropDowAccount
