"use client";

import { useNavbarViewModel } from "@/lib/view-models/useNavbarViewModel";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";

const CartWithBadge = ({ itemCount }: { itemCount: number }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1.5">
      <Image
        src="/navIcon/cart.svg"
        alt="Cart"
        width={26}
        height={26}
        onClick={() => router.push("/cart")}
        className="cursor-pointer"
      />
      {itemCount > 0 && (
        <div className="bg-black text-pink-200 text-xs font-base rounded-full flex items-center justify-center w-5 h-5">
          <span>{itemCount}</span>
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const pathname = usePathname();
  const { navLinks, cartItemCount } = useNavbarViewModel();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`
        w-full h-20 flex justify-center fixed top-0 left-0 z-50 
        transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-white/10 backdrop-blur-lg border-white/20"
            : "bg-transparent"
        }
      `}
    >
      <div className="w-[90%] md:w-[80%] flex items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative h-6 w-6 z-50 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <FiMenu
              className={`absolute h-5 w-5 cursor-pointer transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <FiX
              className={`absolute h-5 w-5 cursor-pointer transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </button>
          <Link href="/">
            <span className="flex items-center">
              <Image
                src="/icons/Logo.svg"
                alt="logo"
                width={28}
                height={28}
                className="h-6 md:h-7 w-auto"
              />
            </span>
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group z-40">
              <Link
                href={link.href}
                className={`flex items-center hover:text-primary-400 ${
                  pathname === link.href ? "text-primary-500 font-semibold" : ""
                } ${
                  link.label === "Search"
                    ? "bg-gray-100 text-gray-700 rounded-full px-4 py-1 text-sm"
                    : ""
                }`}
              >
                {link.label}
                {link.children && (
                  <span className="ml-1 text-sm">
                    <RiArrowDropDownLine />
                  </span>
                )}
              </Link>
              {link.children && (
                <ul className="absolute left-0 top-full mt-4 w-44 rounded-xl border border-white/30 bg-white/40 backdrop-blur-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.children.map((child, index) => (
                    <li key={`${child.href}-${index}`}>
                      <Link
                        href={child.href}
                        className={`block px-4 py-2 hover:text-primary-400 rounded-xl m-1 transition-colors duration-100 ${
                          pathname === child.href
                            ? "text-primary-500 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <div className="md:hidden">
            <CartWithBadge itemCount={cartItemCount} />
          </div>
          <div className="hidden md:flex items-center space-x-4 text-gray-800">
            <Image
              src="/navIcon/search.svg"
              alt="Search"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => console.log("Search")}
            />
            <Image
              src="/navIcon/user.svg"
              alt="User"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => console.log("User")}
            />
            <CartWithBadge itemCount={cartItemCount} />
          </div>
        </div>
        <div
          className={`md:hidden absolute top-20 left-0 w-full bg-white/50 backdrop-blur-md border-t border-white/30 shadow-lg z-30 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <ul className="flex flex-col px-6 py-4 space-y-2 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.label && (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-2 py-2 rounded-md transition ${
                      pathname === link.href
                        ? "text-primary-500 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
