'use client'
import React from 'react';
import { Button, Checkbox, Form, Input, App } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

type FieldType = {
    fullName: string;
    email: string;
    password: string;
    confirm_password: string;
    remember?: string;
};

const RegisterForm = () => {
    const { message, modal, notification } = App.useApp();
    const router = useRouter();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        try {
            const { fullName, email, password, confirm_password } = values;
            const data = { fullName, email, password, confirm_password };
            console.log('data:', data);


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            const d = await res.json();
            if (d.data) {
                //success
                message.success("Đăng ký tài khoản thành công.");
                router.push('/auth/signin');
            } else {
                message.error(d.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            className='max-w-[800px]'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Form.Item<FieldType>
                label="Họ Và Tên"
                name="fullName"
                rules={[{ required: true, message: 'Hãy Nhập Họ Tên!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Hãy Nhập Email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                label="Mật Khẩu"
                rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Xác Nhận Mật Khẩu"
                name="confirm_password"
                rules={[{ required: true, message: 'Hãy Nhập Xác Nhận Mật Khẩu!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>Đăng Ký</Button>
            <div className=' my-[8px] text-body1 items-center flex justify-between'>
                <span>Bạn đã có tài khoản? <Link href="/auth/signin" className='!text-red1'>Đăng nhập ngay</Link></span>
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

export default RegisterForm;
