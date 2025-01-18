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
    email?: string;
    remember?: string;
};

const ForgotPasswordForm = () => (

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
        <div className='h-[30px] text-body1'>Email</div>
        <Form.Item<FieldType>
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>

        <button type='submit' className='w-full h-10 rounded-lg bg-red1 text-white text-body-bold '>Gửi Yêu Cầu</button>

    </Form>

);

export default ForgotPasswordForm;