"use client";
import React, { useRef, useState } from "react";

interface CategoryFilterProps {
  genres: IGenre[]; 
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ genres }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); 

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="container mx-auto">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-2 bg-white p-2 select-none cursor-pointer"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <button
          className={`px-4 py-2 border rounded-lg text-sm transition-all whitespace-nowrap
            ${
              selectedCategory === "Tất cả"
                ? "border-orange-500 text-orange-500 font-semibold bg-white"
                : "border-transparent text-black hover:text-orange-500 hover:font-semibold hover:border-orange-500"
            }`}
        >
          Tất cả
        </button>

        {genres.map((genre) => (
          <button
            key={genre._id} 
            className="px-4 py-2 border rounded-lg text-sm transition-all whitespace-nowrap border-transparent text-black hover:text-orange-500 hover:font-semibold hover:border-orange-500"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
