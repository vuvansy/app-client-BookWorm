'use client'
import React from 'react';
import { App, Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { RootState, AppDispatch } from '@/redux/store';


type FieldType = {
    email: string;
    password: string;
    remember?: string;
};

const LoginForm = () => {
    const { message, modal, notification } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch: AppDispatch = useDispatch();
    const { loading, error, token } = useSelector((state: RootState) => state.auth);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        try {
            const { email, password } = values;
            const resultAction = await dispatch(login({ email, password }));
            if (login.fulfilled.match(resultAction)) {
                message.success("Đăng nhập thành công.");
                const redirectUrl = localStorage.getItem('redirectUrl') || '/';
                localStorage.removeItem('redirectUrl');
                router.push(redirectUrl);
            } else {
                message.error(resultAction.payload as string);
            }
        } catch (error) {
            console.error('Error:', error);
            message.error("Đăng nhập thất bại, vui lòng thử lại.");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600, marginTop: "50px" }}
            className='max-w-[800px] '
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Hãy Nhập Email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu!' }]}
            >
                <Input.Password />
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


