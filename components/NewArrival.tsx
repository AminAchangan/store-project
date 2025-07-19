"use client";

import { useNewArrivals } from "@/lib/view-models/newArrivalViewModel";
import Loader from "@/ui/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function NewArrival() {
  const { products, loading } = useNewArrivals();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="sm:pt-16 pb-16">
      <div className="max-w-[90%] xl:max-w-[80%] mx-auto">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-4xl font-medium">New Arrivals</h2>
          <div className="swiper-pagination-container hidden sm:block"></div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Swiper
              modules={[Pagination, Mousewheel]}
              loop={products.length >= 4}
              spaceBetween={20}
              mousewheel={{ forceToAxis: true }}
              pagination={{
                el: ".swiper-pagination-container",
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  centeredSlides: false,
                },
                420: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  centeredSlides: false,
                },
                540: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  centeredSlides: false,
                },
                870: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  centeredSlides: false,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  centeredSlides: false,
                },
              }}
              className="custom-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    title={product.name}
                    image={product.image_url}
                    price={product.price}
                    id={product.id}
                    badge="NEW"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
