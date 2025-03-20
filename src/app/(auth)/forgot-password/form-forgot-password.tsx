'use client'
import React from 'react';
import { App, Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
    email?: string;
};

const ForgotPasswordForm = () => {
    const { message, modal, notification } = App.useApp();

    const onFinish = async (values: any) => {
        try {
            const { email } = values;
            const data = { email };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            const d = await res.json();
            if (d.statusCode === 201) {
                //success
                message.success(d.message);
            } if (d.statusCode === 404) {
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
};

export default ForgotPasswordForm;