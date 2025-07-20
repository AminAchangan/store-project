"use client";

import ProductList from "@/components/ProductList";
import Filter from "@/ui/Filter";
import ShopHeader from "@/ui/ShopHeader";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/ui/Breadcrumb";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState(initialCategory);
  const [price, setPrice] = useState("all");

  return (
    <div className=" mx-auto py-20 max-w-[90%]">
      <div className="mx-auto">
        <Breadcrumb/>
        <ShopHeader />
        <Filter
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          setCategories={setCategories}
          price={price}
          setPrice={setPrice}
        />
      </div>
      <div className="mx-auto mt-10 ">
        <ProductList
          sortBy={sortBy}
          categories={categories}
          price={price}
        />
      </div>
    </div>
  );
}
