import React from "react";

const sortOptions = [
  "Mới Nhất",
  "Bán Chạy Tuần",
  "Giá Tăng Dần",
  "Giá Giảm Dần",
];

interface SortFilterProps {
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  selectedSort,
  onSelectSort,
}) => {
  return (
    <div className="flex justify-end items-center bg-white py-[10px]  ">
      <span className="text-black text-caption">Sắp xếp theo:</span>
      <select
        value={selectedSort}
        onChange={(e) => onSelectSort(e.target.value)}
        className="px-4 py-2 border h-[40px] rounded-md text-black bg-white shadow-sm focus:ring-2   mx-[15px] "
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
