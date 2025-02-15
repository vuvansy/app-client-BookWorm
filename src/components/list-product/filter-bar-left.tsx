"use client";
import { Form, InputNumber } from "antd";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

interface FilterBarLeftProps {
  onFilterChange: (filters: {
    priceFrom: number | null;
    priceTo: number | null;
  }) => void;
}

export default function FilterBarLeft({ onFilterChange }: FilterBarLeftProps) {
  const categories = [
    "Business",
    "Comics",
    "Cooking",
    "Entertainment",
    "History",
    "Music",
    "Teen",
    "Travel",
  ];
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilterChange({ priceFrom, priceTo });
  };

  return (
    <div className="w-[290px] bg-white p-5 border rounded-lg">
      <div className="flex mb-4 items-center justify-between pt-[20px]">
        <div className="flex">
          <FaFilter size={24} />
          <h3 className="text-[20px] font-bold ml-[10px]">Bộ lọc tìm kiếm</h3>
        </div>
        <TbReload size={21} className="text-end cursor-pointer" />
      </div>
      <div className="h-[1px] w-[250px] opacity-50 bg-gray-300"></div>

      <Form name="category">
        <p className="text-body1 mb-2 mt-5">Danh mục sản phẩm</p>
        {categories.map((cate, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="radio"
              name="category"
              value={cate}
              checked={selectedCategory === cate}
              onChange={() => setSelectedCategory(cate)}
              className="mr-[13px] w-5 h-5 border border-gray-400 rounded-md appearance-none relative 
              checked:bg-red-500 checked:border-red-500 
              checked:after:content-['✓'] checked:after:absolute checked:after:top-0 checked:after:left-[3px] checked:after:text-white checked:after:font-bold"
            />
            <label className="text-caption">{cate}</label>
          </div>
        ))}
      </Form>

      <div className="border-t border-gray-300 opacity-50 my-5"></div>
      <Form name="price-range" onSubmitCapture={applyFilters}>
        <div className="mt-4">
          <p className="text-body1 mb-5">Khoảng giá</p>
          <div className="flex gap-[17px] justify-center items-center max-h-[38px]">
            <InputNumber<number>
              placeholder="đ Từ"
              value={priceFrom ?? undefined}
              onChange={(value) => setPriceFrom(value !== null ? value : null)}
              className="w-[100px]"
              min={0}
            />
            <div className="h-[1px] w-4 bg-gray-400"></div>
            <InputNumber<number>
              placeholder="đ Đến"
              value={priceTo ?? undefined}
              onChange={(value) => setPriceTo(value !== null ? value : null)}
              className="w-[100px]"
              min={0}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#C92127] text-white w-full mt-4 py-2 rounded-lg text-caption"
        >
          Áp dụng
        </button>
      </Form>
    </div>
  );
}
