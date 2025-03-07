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
        layout='vertical'
    >

        <Form.Item<FieldType>
            label="Mật khẩu cũ"
            name="password_old"
            rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu Cũ!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
            label="Mật khẩu mới"
            name="password_new"
            rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu Mới!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: 'Hãy Nhập Xác Nhận Mật Khẩu!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>Lưu Thay Đổi</Button>


    </Form>

);

export default ChangePasswordForm;


