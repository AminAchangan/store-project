"use client";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchViewModel } from "@/lib/view-models/useSearchViewModel";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { results, fetchResults, loading } = useSearchViewModel();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur-lg bg-black/20 z-[110] flex items-start justify-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-[350px] h-40 pt-32"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <label htmlFor="" className="font-semibold text-4xl">
            Search
          </label>
          <div className="flex gap-2">
            <span className="bg-primary-100 flex rounded-full h-8 w-8 items-center justify-center">
              <Image
                src="/icons/interface/outline/search.svg"
                alt=""
                width={15}
                height={15}
              />
            </span>
            <span
              onClick={onClose}
              className="bg-primary-100 flex rounded-full h-8 w-8 items-center justify-center"
            >
              <HiX className="h-5 w-5" />
            </span>
          </div>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="mt-5 w-full bg-primary-100 rounded-2xl px-4 py-3 focus:outline-none"
        />
        <div>
          {!loading && results.length === 0 && query && (
            <p className="mt-4 text-center text-lg  text-primary-400">
              no results found !
            </p>
          )}
          <ul className="mt-4 bg-primary-100 rounded-2xl max-h-96 overflow-y-auto">
            {results.map((item: any) => (
              <li
                key={item.id}
                onClick={() => {
                  router.push(`/product/${item.id}`);
                  onClose();
                }}
                className="mx-auto w-[80%] h-24 py-8 cursor-pointer flex items-center justify-between "
              >
                <Image src={item.image_url} alt="" width={40} height={40} />
                <div>
                  <h3 className="text-primary-500 font-semibold text-sm text-right">
                    {item.name}
                  </h3>
                  <h4 className="text-primary-400 text-xs text-right mt-2">
                    ${item.price}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {loading && (
          <div className="mt-4 text-center">
            <Loader />
          </div>
        )}
      </div>
    </motion.div>
  );
}
