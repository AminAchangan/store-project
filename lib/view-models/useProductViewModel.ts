import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types/Product";

export function useProductViewModel(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products`,
          {
            params: {
              id: `eq.${id}`,
              select: "*",
            },
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env
                .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            },
          }
        );
        setProduct(data[0]);
      } catch (err) {
        console.error("خطا در دریافت محصول:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading };
}
