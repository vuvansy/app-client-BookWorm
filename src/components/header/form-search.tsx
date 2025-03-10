'use client'

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { IoSearchSharp } from "react-icons/io5";
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { sendRequest } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


type FieldType = {
    search?: string;

};

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<IBookTable[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [form] = Form.useForm();

    const fetchSearchResults = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await sendRequest<IBackendRes<IBookTable[]>>({
                url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/search?search=${searchQuery}`,
                method: "GET"

            })
            setResults(res.data ?? []);
            setIsOpen((res.data ?? []).length > 0);

        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useMemo(() => debounce(fetchSearchResults, 500), []);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSearch(value);
    };
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleFocus = () => {
        if (results.length > 0) setIsOpen(true);
    };

    const handleSelectProduct = (productId: string) => {
        setIsOpen(false);
        setResults([]);
        form.setFieldsValue({ search: '' });
        router.push(`/product/${productId}`);
    };

    return (
        <div ref={formRef} className='!relative'>
            <Form
                form={form}
                name="form-search"
                className='!w-full h-[36px]'
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="search"
                    className='!mb-0 '
                >
                    <Input
                        onChange={handleSearch}
                        onFocus={handleFocus}
                        placeholder="Bạn tìm gì hôm nay..."
                        className='h-[36px] !border-transparent !hover:border-transparent !focus:border-transparent' />
                </Form.Item>
                <Button type="primary" htmlType="submit" className='!flex justify-center items-center !absolute top-1/2 transform -translate-y-1/2 right-0 !bg-red1 !border-solid !border-2 !rounded-none !rounded-r-[6px] !px-[12px] !h-[36px]'>
                    <IoSearchSharp className='!w-[22px] !h-[22px]' />
                </Button>

            </Form>
            {isOpen && results.length > 0 && (
                <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-100 overflow-y-auto !z-[50]">
                    {results.map((book) => (
                        <div key={book._id} className="p-1 border-b hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectProduct(book._id)}>
                            <div className='flex items-center'>
                                <div className="relative w-12 h-14 mr-3">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${book.image}`}
                                        alt={book.name}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        className="w-full aspect-[3/4] object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="">{book.name}</h3>
                                    <span className="text-price-special font-bold pr-2">{book.price_new.toLocaleString()}đ</span>
                                    <span className="text-gray-500 line-through">{book.price_old.toLocaleString()}đ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}
export default SearchForm;