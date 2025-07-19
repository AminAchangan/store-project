import Test from "@/components/Test";
import { FilterProps } from "@/types/Props";
import React from "react";

function Filter({
  sortBy,
  setSortBy,
  categories,
  setCategories,
  price,
  setPrice,
}: FilterProps) {
  return (
    <div className="mt-10 flex flex-col md:flex-row sm:flex-row justify-between gap-4 mx-auto ">
      <div className="flex gap-4 items-center justify-between sm:ml-0">
        <div>
          <label
            htmlFor="category"
            className="inline-block mb-2 text-md font-medium text-primary-400"
          >
            CATEGORIES
          </label>
          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            id="category"
            name="category"
            className="appearance-none w-full font-medium bg-gray-100 rounded-xl px-3 py-2 text-primary-600"
          >
            <option value="all">All</option>
            <option value="headphone">Headband</option>
            <option value="earbuds">Earbuds</option>
          </select>
        </div>
        
        <div>
          <label
            htmlFor="price"
            className="inline-block mb-2 text-md font-medium text-primary-400 "
          >
            PRICE
          </label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="price"
            className="appearance-none w-full font-medium bg-gray-100 rounded-xl px-3 py-2 text-primary-600"
          >
            <option value="all">All</option>
            <option value="under-100">Under $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-300">$200 - $300</option>
            <option value="200-300">$300 - $500</option>
            <option value="300-plus">Above $500</option>
          </select>
        </div>
      </div>
      <div className="flex items-center sm:items-end sm:border-none border-y py-2 justify-between">
        <label
          htmlFor="sort"
          className="block text-md font-medium text-primary-500 min-w-[70px]"
        >
          Sort by :
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="sort"
          name="sort"
          className="appearance-none sm:text-left text-center font-medium px-3 py-2 sm:pb-0 bg-white text-primary-400 focus:ring-primary-300"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
