import { Select } from "antd";
import React from "react";

const SORT_OPTIONS = [
  { label: "Theo Tên Từ A-Z", value: "name" },
  { label: "Theo Tên Từ Z-A", value: "-name" },
  { label: "Giá Tăng Dần", value: "price_new" },
  { label: "Giá Giảm Dần", value: "-price_new" },
];

interface Props {
  onSortChange: (value: string) => void;
}

const SortFilter: React.FC<Props> = ({ onSortChange }) => {
  return (
    <div className="flex justify-end items-center gap-2 bg-white py-[10px] pr-5">
      <span className="text-black text-caption">Sắp xếp theo:</span>
      <Select
        className="text-[12px]"
        style={{ width: 160 }}
        options={SORT_OPTIONS}
        defaultValue="name"
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortFilter;
