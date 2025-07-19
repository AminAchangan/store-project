"use client";

import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import axios from "axios";

export const useBestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await axios.get<Product[]>(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?is_best_seller=eq.true&select=*&limit=8`,
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
          }
        );
        setProducts(data);
      } catch (error) {
        console.log("Error fetching best seller:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return { products, loading };
};
