"use client";

import React from "react";
import { useProductList } from "@/lib/view-models/useProductListViewModel";
import Loader from "../ui/Loader";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

type ProductListProps = {
  sortBy: string;
  categories: string;
  price: string;
};

export default function ProductList({
  sortBy,
  categories,
  price,
}: ProductListProps) {
  const { products, loading } = useProductList(sortBy, categories, price);

  if (loading)
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );
  if (products.length === 0)
    return <p className="text-center py-10">cant find product</p>;

  return (
    <section className="sm:pt-16 pb-16 mx-auto">
      <div className=" relative">
        <h1 className="text-4xl font-medium mb-14">All Products</h1>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.name}
                    image={product.image_url}
                    price={product.price}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
