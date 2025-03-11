import React from "react";

const sortOptions = ["Sản phẩm mới", "Giá Tăng Dần", "Giá Giảm Dần"];

const SortFilter: React.FC = () => {
  return (
    <div className="flex justify-end items-center bg-white py-[10px]">
      <span className="text-black text-caption">Sắp xếp theo:</span>
      <select className="px-4 py-2 border h-[40px] rounded-md text-black bg-white shadow-sm focus:ring-2 mx-[15px]">
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
