'use client'

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { IoSearchSharp } from "react-icons/io5";

type FieldType = {
    search?: string;

};

const SearchForm = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values)
    };
    return (
        <Form
            name="form-search"
            className='!relative h-[36px]'
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                name="search"
                className='!mb-0 '
            >
                <Input placeholder="Bạn tìm gì hôm nay..." className='h-[36px]' />
            </Form.Item>
            <Button type="primary" htmlType="submit" className='!flex justify-center items-center !absolute top-1/2 transform -translate-y-1/2 right-0 !bg-red1 !border-solid !border-2 !rounded-none !rounded-r-[6px] !px-[12px] !h-[36px]'>
                <IoSearchSharp className='!w-[22px] !h-[22px]' />
            </Button>

        </Form>
    )
}
export default SearchForm;