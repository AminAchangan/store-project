"use client";

import ProductList from "@/components/ProductList";
import Filter from "@/ui/Filter";
import ShopHeader from "@/ui/ShopHeader";
import React, { useState, Suspense } from "react"; // Suspense رو اینجا import کن
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/ui/Breadcrumb";

// یک کامپوننت جداگانه برای کپسوله کردن منطق سمت کلاینت که از useSearchParams استفاده می‌کنه، ایجاد کن
function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState(initialCategory);
  const [price, setPrice] = useState("all");

  return (
    <>
      <Breadcrumb />
      <ShopHeader />
      <Filter
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        setCategories={setCategories}
        price={price}
        setPrice={setPrice}
      />
      <div className="mx-auto mt-10 ">
        <ProductList sortBy={sortBy} categories={categories} price={price} />
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <div className=" mx-auto py-20 max-w-[90%]">
      {/* ShopContent رو داخل Suspense قرار بده */}
      <Suspense fallback={<div>در حال بارگذاری فیلترهای فروشگاه...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
