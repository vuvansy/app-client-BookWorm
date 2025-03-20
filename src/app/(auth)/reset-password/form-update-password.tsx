'use client'
import React, { useState, useEffect } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

type FieldType = {
    password?: string;
    confirm_password?: string;
};

const UpdatePasswordForm = () => {
    const { message } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState('');

    // Move token extraction to useEffect to prevent infinite renders
    useEffect(() => {
        const urlToken = searchParams.get('token');
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const onFinish = async (values: any) => {
        const { password, confirm_password } = values;
        const data = { password, confirm_password, token };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            );

            const d = await res.json();
            if (d.statusCode === 200) {
                // success
                message.success(d.message);
                router.push('/login');
            } if (d.statusCode === 400) {
                message.error(d.message);
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Có lỗi xảy ra. Vui lòng thử lại.');
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
                label="Mật khẩu"
                name="password"
                rules={[
                    { required: true, message: 'Hãy Nhập Mật Khẩu!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Xác nhận mật khẩu"
                name="confirm_password"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Hãy Nhập Xác Nhận Mật Khẩu!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>
                Lưu Thay Đổi
            </Button>
        </Form>
    );
};

export default UpdatePasswordForm;