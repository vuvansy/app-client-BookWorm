import { Select } from "antd";
import React from "react";

const SORT_OPTIONS = [
  { label: "A-Z", value: "name" },
  { label: "Z-A", value: "-name" },
  { label: "Giá tăng dần", value: "price_new" },
  { label: "Giá giảm dần", value: "-price_new" },
];

interface Props {
  onSortChange: (value: string) => void;
}

const SortFilter: React.FC<Props> = ({ onSortChange }) => {
  return (
    <div className="flex justify-end items-center gap-2 bg-white py-[10px] pr-5">
      <span className="text-black text-caption">Sắp xếp theo:</span>
      <Select
        className="px-4 py-2 border h-[40px] rounded-md text-black bg-white shadow-sm focus:ring-0 focus:outline-none mx-[15px]"
        style={{ width: 160 }}
        options={SORT_OPTIONS}
        defaultValue="name"
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortFilter;
