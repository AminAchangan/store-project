"use client";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchViewModel } from "@/lib/view-models/useSearchViewModel";
import { useRouter } from "next/navigation";
import Loader from "@/ui/Loader";
import { MdOutlineFavoriteBorder } from "react-icons/md";


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
    >      <div className="w-[80%] h-full flex justify-center lg:justify-between items-center max-w-6xl mx-auto">
            <Image
              key={1}
              src="/bgNews1.png"
              alt="Decorative background"
              width={150}
              height={150}
              className="hidden lg:block -rotate-[18deg]"
            />
            <div className="flex flex-col items-center text-center">
              <h1 className="font-medium text-3xl sm:text-4xl mb-3">
                Join Our Newsletter
              </h1>
              <h3 className="text-base mb-10 text-primary-600">
                Sign up for deals, new products and promotions
              </h3>
              <div className="flex items-center justify-between pb-3 border-b-[1px] border-gray-400 w-full max-w-md">
                <div className="flex items-center gap-x-2 justify-evenly">
                  <CgMail className="text-gray-400 mr-2 h-6 w-6" />
                  <input
                    className="bg-primary-300 text-gray-500 placeholder-gray-400 w-full focus:outline-none"
                    placeholder="Email address"
                  />
                </div>
                <button className="text-sm text-gray-400 hover:text-gray-700 transition font-medium">
                  Signup
                </button>
              </div>
            </div>
            <Image
              key={2}
              src="/NewsPic.png"
              alt="Newsletter promotion"
              width={200}
              height={200}
              className="hidden lg:block mb-[-10px]"
            />
          </div>
      <div
        className="gap-5.5 max-w-[350px] gap-6 h-40 pt-32 relative max-h-[250px] w-full flex flex-col items-center justify-center rounded-3xl overflow-hidden py-20 bg-[url('/shop-bg.jpg')] bg-cover bg-center appearance-none w-full font-medium bg-gray-100 rounded-xl px-3 py-2 text-primary-600"
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        <div>
          {" "}
          <div className="flex items-center justify-evenly bg-primary-200 w-20 h- rounded-md">
            <button>-</button>
            <h1>0</h1>
            <button>+</button>
          </div>
          <div className="flex items-center justify-between mt-5">
            <button>
              Wishlist
              <span>
                <MdOutlineFavoriteBorder />
              </span>
            </button>
          </div>
        </div>
        <div className="flex gap-6 flex-row items-center justify-between mt-5">
          <label htmlFor="" className="font-semibold text-4xl">
            Search
          </label>
          <div className="flex gap-2 justify-start sm:justify-center mx-2">
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
                onClick={() => router.push(`/product/${item.id}`)}
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
