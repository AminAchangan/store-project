"use client";

import Image from "next/image";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const Countdown = dynamic(() => import("react-countdown"), { ssr: false });

function PromotionSection() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row md:h-[530px] sm:mt-16 mb-16 bg-fuchsia-50">
      <div className="w-full md:w-1/2 h-[450px] md:h-full">
        <Image
          src="/bg2.png"
          alt="Promotion background"
          width={500}
          height={530}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-8 md:px-12">
        <h3 className="text-purple-600 uppercase mb-4 font-medium">
          Promotion
        </h3>
        <h1 className="text-4xl md:text-5xl font-medium text-primary-800 mb-4">
          Hurry up! 40% OFF
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thousands of high tech are waiting for you
        </p>
        <p className="text-gray-700 text-base mb-3">Offer expires in:</p>
        <Countdown
          date={new Date("2025-07-30T00:00:00")}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return <span>Offer has expired!</span>;
            } else {
              return (
                <div className="flex space-x-2 md:space-x-4 mb-6">
                  {[
                    { value: days, label: "days" },
                    { value: hours, label: "hrs" },
                    { value: minutes, label: "min" },
                    { value: seconds, label: "sec" },
                  ].map(({ value, label }, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center bg-white p-2 w-16 h-16 rounded-xl"
                    >
                      <span className="text-2xl font-semibold text-gray-900">
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              );
            }
          }}
        />
        <Link href="/shop">
          {" "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-black mx-auto lg:ml-0 px-8 py-3 rounded-xl  transition-all duration-300 ease-in-out hover:bg-purple-700"
          >
            Shop now
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default PromotionSection;
