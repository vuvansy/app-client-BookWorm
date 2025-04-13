'use client'
import React, { useEffect } from 'react';
import { App, Button, Form, Input } from 'antd';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";

type FieldType = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { data: session } = useSession();
    const { message, notification } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const redirectTo = searchParams.get("redirect");
        if (session?.user && redirectTo) {
            router.push(redirectTo);
        }
    }, [session?.user, searchParams, router]);
    
    useEffect(() => {
        if (session?.error) {
            notification.error({
                message: "Lỗi Đăng Nhập",
                description: session.error,
            });
        }
    }, [session?.error, notification]);

    const onFinish = async (values: any) => {
        try {
            const { email, password } = values;
           
            const res = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (!res?.error) {
                message.success("Đăng nhập tài khoản thành công!");
                router.push("/");
            } else {
                notification.error({
                    message: "Lỗi Đăng Nhập",
                    description: res.error,
                });
            }

        } catch (error) {
            console.error("Error:", error);
            notification.error({
                message: "Lỗi",
                description: "Đã xảy ra lỗi trong quá trình đăng nhập!",
            });
        }
    };

    return (

        <Form
            name="basic"
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
                <Input autoComplete="email" />
            </Form.Item>

            <Form.Item<FieldType>
                label="Mật Khẩu"
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className='w-full !bg-red1 !text-body-bold'
            >
                Đăng Nhập
            </Button>
            <div className='my-[8px] text-body1 items-center flex justify-between'>
                <span>Bạn chưa có tài khoản? <Link href="/register" className='!text-red1'>Đăng ký ngay</Link></span>
            </div>
            <div className=' mb-[2px] text-body1 items-center flex justify-between'>
                <Link href="/forgot-password" className='!text-red1'>Quên mật khẩu</Link>
            </div>
            <div className='flex items-center justify-center text-body-bold mb-[10px]'>Hoặc</div>
            <Button
                onClick={() => {
                    signIn("github")
                }}
                icon={<FaGithub size={20} />}
                className='w-full !text-body-bold items-center !flex justify-center mb-4 !bg-black !text-white !border !border-white'
            >
                Đăng nhập với Github
            </Button>
            <Button
                onClick={() => {
                    signIn("google")
                }}
                icon={<FaGoogle size={20} />}
                className='w-full !text-body-bold items-center !flex justify-center !border !border-black/30  !text-black'
            >
                Đăng nhập với Google
            </Button>

        </Form>
    );
};

export default LoginForm;