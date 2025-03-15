"use client";
import { useState, useEffect } from "react";
import { Form, InputNumber } from "antd";
import { FaFilter } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

interface FilterBarLeftProps {
  genres: IGenre[];
  authors: IAuthor[];
  selectedGenres: string[];
  selectedAuthors: string[];
  onGenreChange: (genres: string[]) => void;
  onAuthorChange: (authors: string[]) => void;
  onResetFilters: () => void;
  onApplyFilters: (filters: { price_min?: number; price_max?: number }) => void;
}

export default function FilterBarLeft({
  genres,
  authors,
  selectedGenres,
  selectedAuthors,
  onGenreChange,
  onAuthorChange,
  onResetFilters,
  onApplyFilters,
}: FilterBarLeftProps) {
  const [selectedGenre, setSelectedGenre] = useState<string[]>(selectedGenres);
  const [selectedAuthor, setSelectedAuthor] =
    useState<string[]>(selectedAuthors);
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);

  useEffect(() => {
    setSelectedGenre(selectedGenres);
    setSelectedAuthor(selectedAuthors);
  }, [selectedGenres, selectedAuthors]);

  const handleGenreChange = (id: string) => {
    const updatedSelection = selectedGenre.includes(id)
      ? selectedGenre.filter((item) => item !== id)
      : [...selectedGenre, id];

    setSelectedGenre(updatedSelection);
    onGenreChange(updatedSelection);
  };

  const handleAuthorChange = (id: string) => {
    const updatedSelection = selectedAuthor.includes(id)
      ? selectedAuthor.filter((item) => item !== id)
      : [...selectedAuthor, id];

    setSelectedAuthor(updatedSelection);
    onAuthorChange(updatedSelection);
  };

  const handleApplyFilters = () => {
    onApplyFilters({ price_min: priceMin, price_max: priceMax });
  };

  const handleResetFilters = () => {
    setSelectedGenre([]);
    setSelectedAuthor([]);
    setPriceMin(undefined);
    setPriceMax(undefined);
    onResetFilters();
  };

  return (
    <div className="w-full bg-white p-5 border rounded-lg">
      <div className="flex mb-4 items-center justify-between pt-[20px]">
        <div className="flex">
          <FaFilter size={24} className="cursor-pointer" />
          <h3 className="lg:text-[20px] text-sub-heading-bold lg:font-bold ml-[10px]">
            Bộ lọc tìm kiếm
          </h3>
        </div>
        <TbReload
          size={21}
          className="cursor-pointer"
          onClick={handleResetFilters}
        />
      </div>
      <div className="h-[1px] w-[250px] opacity-50 bg-gray-300"></div>

      <Form name="category">
        <p className="text-body1 my-5">Danh mục sản phẩm</p>
        {genres.map((genre) => (
          <div key={genre._id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={selectedGenre.includes(genre._id)}
              onChange={() => handleGenreChange(genre._id)}
              className="mr-[13px] w-5 h-5 border border-gray-400 rounded-md appearance-none relative 
              checked:bg-red-500 checked:border-red-500 
              checked:after:content-['✓'] checked:after:absolute checked:after:top-[0px] checked:after:left-[4px] 
              checked:after:text-white checked:after:font-bold checked:after:text-[14px]"
            />
            <label className="text-caption">{genre.name}</label>
          </div>
        ))}
      </Form>

      <Form name="authors">
        <p className="text-body1 my-5">Tác giả</p>
        {authors.map((author) => (
          <div key={author._id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={selectedAuthor.includes(author._id)}
              onChange={() => handleAuthorChange(author._id)}
              className="mr-[13px] w-5 h-5 border border-gray-400 rounded-md appearance-none relative 
              checked:bg-red-500 checked:border-red-500 
              checked:after:content-['✓'] checked:after:absolute checked:after:top-[0px] checked:after:left-[4px] 
              checked:after:text-white checked:after:font-bold checked:after:text-[14px]"
            />
            <label className="text-caption">{author.name}</label>
          </div>
        ))}
      </Form>

      <Form name="price-range">
        <div className="mt-4">
          <p className="text-body1 mb-5">Khoảng giá</p>
          <div className="flex gap-[17px] w-full justify-center items-center max-h-[38px]">
            <InputNumber<number>
              placeholder="đ Từ"
              value={priceMin}
              onChange={(value) => setPriceMin(value ?? undefined)}
              min={0}
            />
            <div className="h-[1px] w-4 bg-gray-400"></div>
            <InputNumber<number>
              placeholder="đ Đến"
              value={priceMax}
              onChange={(value) => setPriceMax(value ?? undefined)}
              min={0}
            />
          </div>
        </div>
        <button
          type="button"
          className="bg-[#C92127] text-white w-full mt-4 py-2 rounded-lg text-caption"
          onClick={handleApplyFilters}
        >
          Áp dụng
        </button>
      </Form>
    </div>
  );
}
