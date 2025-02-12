import { FaFilter } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

const FilterBarLeft = () => {
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

  return (
    <div className="w-[290px] bg-white p-4 border rounded-lg">
      <div className="flex mb-4 items-center justify-between">
        <div className="flex">
          <FaFilter size={24} />
          <h3 className="text-[20px] font-bold  ml-[10px]">Bộ lọc tìm kiếm</h3>
        </div>
        <TbReload size={21} className="text-end cursor-pointer" />
      </div>

      <div>
        <p className="text-body1 mb-2">Danh mục sản phẩm</p>
        {categories.map((cate, index) => (
          <div key={index} className="mb-2 flex  items-center">
            <input
              type="radio"
              name="category"
              value={cate}
              className="mr-[13px] w-5 h-5 border border-gray-400 rounded-md appearance-none relative 
              checked:bg-red-500 checked:border-red-500 
              checked:after:content-['✓'] checked:after:absolute checked:after:top-0 checked:after:left-[3px] checked:after:text-white checked:after:font-bold"
            />
            <label className="text-caption">{cate}</label>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 opacity-50 my-5"></div>

      <div className="mt-4">
        <p className="text-body1 mb-5">Khoảng giá</p>
        <div className="flex gap-[17px] justify-center items-center max-h-[38px] ">
          <input
            type="number"
            placeholder="đ Từ"
            value=""
            className="border p-2 w-[100px]"
          />
          <div className="h-[1px] w-4 bg-gray-400"></div>

          <input
            type="number"
            placeholder="đ Đến"
            value=""
            className="border p-2 w-[100px]"
          />
        </div>
      </div>

      <button className="bg-[#C92127] text-white w-full mt-4 py-2 rounded-lg text-caption">
        Áp dụng
      </button>
    </div>
  );
};

export default FilterBarLeft;
