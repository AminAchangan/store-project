"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/ui/Loader";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  color: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<CartItem[]>("/api/cart");
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id: string, delta: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      await axios.patch("/api/cart", { id, quantity: newQuantity });
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const confirmRemove = (id: string) => {
    setItemToRemove(id);
    setShowConfirm(true);
  };

  const handleRemove = async () => {
    if (!itemToRemove) return;
    try {
      await axios.delete("/api/cart", { data: { id: itemToRemove } });
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemToRemove)
      );
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item", error);
      toast.error("Failed to remove item.");
    }
    setShowConfirm(false);
    setItemToRemove(null);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full mt-28">
      <div className="w-[90%] md:w-[70%] mx-auto flex flex-col md:flex-row justify-between gap-x-10">
        <div className="w-full">
          <h1 className="text-4xl mb-10 font-medium">Cart</h1>
          <div className="flex flex-col gap-4 mb-8">
            {isLoading ? (
              <div className="text-center py-20 text-lg"><Loader/></div>
            ) : cartItems.length === 0 ? (
              <p className="text-lg text-gray-600 mx-auto">
                Your Cart is empty!
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-primary-200 gap-x-4 rounded-2xl py-5 px-6 md:px-8 flex flex-row items-center justify-between"
                >
                  <div className="flex flex-row items-center gap-x-4">
                    <Image
                      alt={item.name}
                      width={100}
                      height={100}
                      src={item.image_url}
                    />
                    <div className="">
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-start justify-between gap-x-2">
                          <h1 className="text-xl mb-5">{item.name}</h1>

                          <div className="flex flex-col items-start gap-x-2">
                            <h2 className="text-primary-400 font-medium">
                              ${item.price}
                            </h2>
                            <div className="flex gap-x-2">
                              <div
                                className="h-4 w-4 border border-primary-300 rounded-md"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <h2 className="text-xs text-primary-400">
                                {item.color}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-x-4">
                    <div className="flex items-center justify-evenly bg-primary-100 w-24 h-10 rounded-xl">
                      {item.quantity > 1 ? (
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => confirmRemove(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <BiTrash className="h-4 w-4" />
                        </button>
                      )}
                      <h1>{item.quantity}</h1>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-full md:mt-20 mt-0 ">
          <div className="flex flex-col py-7 justify-between px-8 border-y-2 gap-5">
            <div className="flex justify-between">
              <h1 className="text-md text-primary-400">Subtotal :</h1>
              <h1 className="text-md text-primary-400"> ${totalPrice}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md text-primary-400">Shipping :</h1>
              <h1 className="text-md text-primary-400">Free</h1>
            </div>
          </div>
          <div className="flex flex-row pt-8 justify-between px-8 ">
            <h1 className="text-2xl">Total :</h1>
            <h1 className="text-2xl text-primary-400"> ${totalPrice}</h1>
          </div>
          <div>
            <button className="h-12 w-full mt-10 mb-12 bg-primary-800 text-primary-200 py-2 px-6 rounded-xl">
              Check out
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-primary-200 p-6 rounded-2xl w-80 max-w-full text-center">
            <p className="mb-4 text-lg font-medium">
             Are you sure to remove this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-primary-300 rounded-xl hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
