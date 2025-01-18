'use client'
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    password_old?: string;
    password_new?: string;
    confirmPassword?: string;
    remember?: string;
};

const ChangePasswordForm = () => (

    <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600, marginTop: "50px" }}
        className='max-w-[800px]'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='large'
    >

        <div className='h-[30px] text-body1'>Mật khẩu cũ</div>
        <Form.Item<FieldType>
            name="password_old"
            rules={[{ required: true, message: 'Please input your old password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <div className='h-[30px] text-body1'>Mật khẩu mới</div>
        <Form.Item<FieldType>
            name="password_new"
            rules={[{ required: true, message: 'Please input your new password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <div className='h-[30px] text-body1'>Nhập lại mật khẩu</div>
        <Form.Item<FieldType>
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your confirmPassword!' }]}
        >
            <Input.Password />
        </Form.Item>

        <button type='submit' className='w-full h-10 rounded-lg bg-red1 text-white text-body-bold '>Lưu Thay Đổi</button>


    </Form>

);

export default ChangePasswordForm;


