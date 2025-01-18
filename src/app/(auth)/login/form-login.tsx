'use client'
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";



const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const LoginForm = () => (

    <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600, marginTop: "50px" }}
        className='max-w-[800px] '
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='large'
    >
        <div className='h-[30px] text-body1'>Email</div>
        <Form.Item<FieldType>
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <div className='h-[30px] text-body1'>Password</div>
        <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>
        <button type='submit' className='w-full h-10 rounded-lg bg-red1 text-white text-body-bold '>Đăng Nhập</button>
        <div className='h-5 my-[10px] text-body1 items-center flex justify-between'>
            <span>Bạn chưa có tài khoản? <Link href="/register" className='text-red1'>Đăng ký ngay</Link></span>
        </div>
        <div className='h-5 mb-[10px] text-body1 items-center flex justify-between'>
            <Link href="/forgot-password" className='text-red1'>Quên mật khẩu</Link>
        </div>
        <div className='w-full h-5 mb-[10px] '>
            <div className='w-10 h-5 text-body-bold mx-auto'>Hoặc</div>
        </div>
        <button type='button' className='w-full h-10 rounded-lg bg-blue-text text-white text-body-bold mb-[10px] items-center flex justify-center gap-6'><FaFacebook size={24} />Đăng nhập với Facebook</button>
        <button type='button' className='w-full h-10 rounded-lg border border-black/30 text-black text-body-bold items-center flex justify-center gap-6 pr-4 '><FaGoogle size={24} />Đăng nhập với Google</button>

    </Form>

);

export default LoginForm;


