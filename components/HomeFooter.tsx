"use client";

import { useNavbarViewModel } from "@/lib/view-models/useNavbarViewModel";
import Link from "next/link";
import Image from "next/image";

function HomeFooter() {
  const { navLinks } = useNavbarViewModel();

  return (
    <div className="bg-primary-700 h-auto lg:h-[250px] w-full text-gray-300 p-8 lg:p-6 lg:pt-20">
      <div className="w-[80%] mx-auto">
        <div className="mx-auto flex flex-col items-center gap-y-8 lg:flex-row lg:justify-between lg:pb-[50px] lg:border-b-[1px] border-primary-500">
          <div className="flex flex-col items-center lg:flex-row">
            <p className="mt-6 lg:mt-0 lg:border-l-[1px] h-5 border-gray-400 lg:pl-7 text-sm">
              Headphone Store
            </p>
          </div>
          <div>
            <ul className="flex flex-col items-center lg:flex-row gap-6 text-sm font-normal">
              {navLinks.map((link) => (
                <li key={link.href} className="relative group z-40">
                  <Link
                    href={link.href}
                    className="flex items-center hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center gap-y-8 lg:flex-row lg:justify-between">
          <div className="text-xs flex flex-col items-center lg:flex-row gap-y-4">
            <p>
              Copyright © {new Date().getFullYear()} 3legant. All rights
              reserved
            </p>
            <div className="flex gap-x-4 lg:ml-7">
              <h3 className="font-medium">Privacy Policy</h3>
              <h3 className="font-medium">Terms of Use</h3>
            </div>
          </div>

          <div className="flex gap-x-6">
            <Image
              src="/icons/social/outline/instagram.svg"
              alt="instagram"
              width={22}
              height={22}
            />
            <Image
              src="/icons/social/outline/facebook.svg"
              alt="facebook"
              width={24}
              height={24}
            />
            <Image
              src="/icons/social/outline/youtube.svg"
              alt=""
              width={23}
              height={23}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
