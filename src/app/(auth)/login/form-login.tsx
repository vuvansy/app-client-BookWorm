'use client'
import React, { useEffect } from 'react';
import { App, Button, Form, Input } from 'antd';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCurrentApp } from '@/context/app.context';


type FieldType = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { setIsAuthenticated, setUser, user } = useCurrentApp();
    const { message, notification } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const redirectTo = searchParams.get("redirect");
        if (user && redirectTo) {
            router.push(redirectTo);
        }
    }, [user]);

    const onFinish = async (values: any) => {
        try {
            const { email, password } = values;
            const data = { email, password };
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            const dataRes: IBackendRes<ILogin> = await res.json();
            if (dataRes.data) {
                //success
                setIsAuthenticated(true);
                setUser(dataRes.data.user)
                localStorage.setItem('access_token', dataRes.data.access_token);
                message.success('Đăng nhập tài khoản thành công!');
                router.push('/');
            } else {
                notification.error({
                    message: 'Lỗi Đăng Nhập',
                    description: (dataRes.message),
                });

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600, marginTop: "50px" }}
            className='max-w-[800px] '
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Email không được để trống!' },
                    { type: "email", message: "Email không đúng định dạng!" }
                ]}
            >
                <Input autoComplete="email"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>Đăng Nhập</Button>
            <div className=' my-[10px] text-body1 items-center flex justify-between'>
                <span>Bạn chưa có tài khoản? <Link href="/register" className='!text-red1'>Đăng ký ngay</Link></span>
            </div>
            <div className=' mb-[10px] text-body1 items-center flex justify-between'>
                <Link href="/forgot-password" className='!text-red1'>Quên mật khẩu</Link>
            </div>
            <div className='flex items-center justify-center text-body-bold mb-[10px]'>Hoặc</div>
            <Button type="primary" icon={<FaFacebook size={20} />} className='w-full !text-body-bold items-center !flex justify-center mb-4'>Đăng nhập với Facebook</Button>
            <Button icon={<FaGoogle size={20} />} className='w-full !text-body-bold items-center !flex justify-center !border !border-black/30  !pr-8   !text-black'>Đăng nhập với Google</Button>

        </Form>
    );
};

export default LoginForm;


