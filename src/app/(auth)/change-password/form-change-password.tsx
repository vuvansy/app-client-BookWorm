'use client'
import React from 'react';
import { App, Button, Checkbox, Form, Input } from 'antd';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

type FieldType = {
    current_password: string;
    new_password: string;
    confirm_password: string;
};

const ChangePasswordForm = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { message, modal, notification } = App.useApp();
    const Token = localStorage.getItem('access_token');
    if (!Token) {
        message.error('Bạn chưa đăng nhập. Vui lòng đăng nhập trước.');
        return;
    }
    const onFinish = async (values: any) => {
        const { current_password, new_password, confirm_password } = values;
        const data = { current_password, new_password, confirm_password };
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/change-password`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }
            );
            const d = await res.json();
            if (d.statusCode === 200) {
                message.success(d.message);
                setTimeout(() => form.resetFields(), 0);
            }
            else {
                message.error(d.message);
            }
        } catch (error) {
            console.log('error', error)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            form={form}
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
                name="current_password"
                rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu Cũ!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Mật khẩu mới"
                name="new_password"
                rules={[{ required: true, message: 'Hãy Nhập Mật Khẩu Mới!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Xác nhận mật khẩu"
                name="confirm_password"
                rules={[{ required: true, message: 'Hãy Nhập Xác Nhận Mật Khẩu!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" className='w-full !bg-red1 !text-body-bold'>Lưu Thay Đổi</Button>


        </Form>
    );

};

export default ChangePasswordForm;
