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
        layout='vertical'
    >
        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Hãy Nhập Email!' }]}
        >
            <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>Gửi Yêu Cầu</Button>

    </Form>

);

export default ForgotPasswordForm;