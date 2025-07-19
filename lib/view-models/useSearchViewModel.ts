import { Product } from "@/types/Product";
import axios from "axios";
import { useState } from "react";

export function useSearchViewModel() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products`,
        {
          params: {
            name: `ilike.*${query}*`,
            select: "*",
          },
          headers: {
            apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env
              .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );
      setResults(data);
    } catch {
      console.log("we have problem in getting data !");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, fetchResults };
}
