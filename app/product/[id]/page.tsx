"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useProductViewModel } from "@/lib/view-models/useProductViewModel";
import Loader from "@/ui/Loader";
import { useState, useEffect } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Breadcrumb from "@/ui/Breadcrumb";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams<any>();
  const { product, loading } = useProductViewModel(id);
  const colors =
    typeof product?.colors === "string"
      ? JSON.parse(product.colors)
      : product?.colors;
  const [count, setCount] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [fav, setFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await axios.post("/api/cart", {
        productId: product.id,
        quantity: count,
        color: selectedColor,
        price: product.price,
        image_url: product.image_url,
      });
      toast.success("Product added to cart successfully!");
    } catch {
      toast.error("Failed to add product to cart!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image_url);
      if (colors && colors.length > 0) {
        setSelectedColor(colors[0]);
      }
    }
  }, [product]);

  if (loading)
    return (
      <div className="text-center  mt-80 h-screen">
        <Loader />
      </div>
    );
  if (!product) return <p className="text-center mt-6">no product found !</p>;

  return (
    <div className="max-w-[80%] mx-auto mt-24 md:mt-28 md:mb-48 h-full">
      <div className="mb-8 md:mb-20 items-center justify-center flex">
        <Breadcrumb />
      </div>
      <div className="flex flex-col md:flex-row md:items-start items-center justify-evenly gap-5">
        <div className="flex flex-col gap-4 h-[25rem]">
          <div className="flex items-center justify-center bg-primary-200 rounded-2xl sticky p-4 my-auto mx-auto w-80 h-full">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt=""
                fill
                className="transition-all duration-300 w-60 h-60 p-8 object-contain"
              />
            )}
          </div>
          {product.gallery_images && (
            <div className="flex gap-2">
              {product.gallery_images.map((img: string, idx: number) => (
                <Image
                  key={idx}
                  src={img}
                  alt=""
                  width={50}
                  height={50}
                  onClick={() => setSelectedImage(img)}
                  className={`cursor-pointer rounded-md border p-2 bg-primary-200 object-cover ${
                    selectedImage === img
                      ? "border-primary-300"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <h3 className="text-md text-primary-400">{product.description}</h3>
            <h4 className="text-3xl font-semibold mb-5">
              ${product.price * count}
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            {colors && Array.isArray(colors) && (
              <div className="flex gap-2 mb-4">
                {colors.map((color: string, idx: number) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-md border cursor-pointer ${
                      selectedColor === color
                        ? "border-primary-400"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelectedColor(color);
                      const relatedImage = product.gallery_images?.find(
                        (img: string) => img.includes(color.replace("#", ""))
                      );
                      setSelectedImage(relatedImage || product.image_url);
                    }}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-start gap-3">
              <div className="flex items-center justify-evenly bg-primary-200 w-24 h-10 rounded-xl bg-">
                <button
                  onClick={() => {
                    setCount(count > 1 ? count - 1 : count);
                  }}
                >
                  -
                </button>
                <h1>{count}</h1>
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    setFav(!fav);
                  }}
                  className="bg-primary-200 rounded-xl h-10 flex items-center py-1 px-6 text-sm font-medium justify-center w-full text-primary-700"
                >
                  {fav ? (
                    <MdOutlineFavorite className="inline-block mr-1 h-4 w-4" />
                  ) : (
                    <MdOutlineFavoriteBorder className="inline-block mr-1 h-4 w-4" />
                  )}
                  Wishlist
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`h-10 w-full mt-5 mb-12 bg-primary-800 text-primary-200 py-2 px-6 rounded-xl ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
