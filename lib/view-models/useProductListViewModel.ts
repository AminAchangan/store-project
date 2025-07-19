import { useEffect, useState } from "react";
import { supabaseAxios } from "@/lib/supabaseClient";
import { Product } from "@/types/Product";

export function useProductList(
  sortBy: string,
  categories: string,
  price: string
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const orderString =
          sortBy === "oldest"
            ? "created_at.asc"
            : sortBy === "price-low-high"
            ? "price.asc"
            : sortBy === "price-high-low"
            ? "price.desc"
            : "created_at.desc";

        let priceFilter = "";
        if (price === "under-100") priceFilter = "price=lt.100";
        else if (price === "100-200") priceFilter = "price=gte.100&price=lt.200";
        else if (price === "200-300") priceFilter = "price=gte.200&price=lt.300";
        else if (price === "300-500") priceFilter = "price=gte.300&price=lt.500";
        else if (price === "300-plus") priceFilter = "price=gte.500";

        let categoryFilter = "";
        if (categories !== "all") categoryFilter = `category=eq.${categories}`;

        const filters = [priceFilter, categoryFilter].filter(Boolean).join("&");
        const url = `/products?select=*&order=${orderString}` + (filters ? `&${filters}` : "");
        const response = await supabaseAxios.get(url);
        setProducts(response.data || []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch products:", error.message);
        } else {
          console.error("Failed to fetch products:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [sortBy, categories, price]);

  return { products, loading };
}
