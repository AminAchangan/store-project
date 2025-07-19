"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function BrandCollection() {
  const brands = [
    { name: "Apple", logo: "/brands/apple-airpods.svg", slug: "apple" },
    { name: "Bose", logo: "/brands/bose1.svg", slug: "bose" },
    { name: "Beats", logo: "/brands/beats.png", slug: "beats" },
    { name: "Senheiser", logo: "/brands/sennheiser.svg", slug: "senheiser" },
    {
      name: "Skullcandy",
      logo: "/brands/skullcandy.svg",
      slug: "skullcandy",
    },
    { name: "sony", logo: "/brands/sony.png", slug: "sony" },
  ];

  const scrollContainer = useRef<HTMLUListElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? scrollContainer.current.scrollLeft - scrollAmount
          : scrollContainer.current.scrollLeft + scrollAmount;

      scrollContainer.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-4 my-8 w-full bg-white">
      <div className="overflow-hidden w-[80%] mx-auto">
        <ul
          ref={scrollContainer}
          className="flex flex-nowrap items-center lg:justify-between 
                     overflow-x-auto space-x-12 lg:space-x-0 
                     px-6 lg:px-0 no-scrollbar pb-4 -mb-4"
        >
          {brands.map((brand) => (
            <li key={brand.slug} className="flex-shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={20}
                className="object-contain h-4 lg:h-5 transition duration-300 filter grayscale hover:filter-none hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handleScroll("left")}
          className="p-1.5 rounded-full  transition"
          aria-label="Scroll left"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-500  hover:text-gray-400" />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="p-1.5 rounded-full transition"
          aria-label="Scroll right"
        >
          <FaArrowRight className="w-4 h-4 text-gray-500  hover:text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default BrandCollection;
