"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="mx-auto overflow-y-hidden"
        style={{
          background:
            "radial-gradient(circle, hsla(211, 66%, 87%, 1) 0%, hsla(292, 21%, 86%, 1) 23%, hsla(348, 67%, 88%, 1) 50%, hsla(331, 38%, 82%, 1) 74%, hsla(272, 26%, 72%, 1) 100%)",
        }}
      >
        <div
          className="flex flex-col lg:flex-row items-center max-w-[90%] mx-auto
        justify-between gap-8 mt-[72px] lg:mt-0"
        >
          <motion.img
            src="/HeroMan1.png"
            alt="Man"
            className="w-[300px] lg:w-auto max-w-lg object-contain pt-8 lg:pt-32 order-2 lg:order-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <div className="flex flex-col text-center lg:text-left text-primary-800 pt-10 lg:pt-0 order-1 lg:order-2">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Listen to the <br />
              <span className="text-purple-800">amazing</span> music sound.
            </h1>
            <p className="text-xl mt-4">Experience music like never before</p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white w-[230px] bg-black mx-auto lg:ml-0 px-14 py-3 rounded-xl mt-6 transition-all duration-300 ease-in-out hover:bg-purple-700"
              >
                Shopping Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
