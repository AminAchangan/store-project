"use client";

import { useState } from "react";
import useSWR from "swr";

export function useNavbarViewModel() {
  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Shop",
      href: "/shop",
      children: [
        { label: "Headphones", href: { pathname: "/shop", query: { category: "headphone" } } },
        { label: "Earbuds", href: { pathname: "/shop", query: { category: "earbuds" } } },
        { label: "Accessories", href: { pathname: "/shop", query: { category: "accessories" } } },
      ],
    },
    {
      label: "Blog",
      href: "/blog",
    },
    { label: "Contact Us", href: "/contact" },
  ];

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/cart", fetcher, { refreshInterval: 2000 });

  const totalCount = data?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

  return {
    navLinks,
    cartItemCount: totalCount,
  };
}
