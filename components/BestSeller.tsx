"use client";

import { useBestSellers } from "@/lib/view-models/bestSellerViewModel";
import React from "react";
import { motion } from "framer-motion";
import Loader from "@/ui/Loader";
import ProductCard from "@/components/ProductCard";

function BestSeller() {
  const { products, loading } = useBestSellers();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="sm:pt-16 pb-16">
      <div className="max-w-[90%] sm:max-w-[80%] mx-auto relative">
        <h1 className="text-4xl font-medium mb-14">Best Seller</h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard
                  title={product.name}
                  image={product.image_url}
                  price={product.price}
                  id={product.id}
                  badge="HOT"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default BestSeller;
