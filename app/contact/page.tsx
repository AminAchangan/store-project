"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="bg-primary-100 py-32 px-6 flex flex-col-reverse lg:flex-row gap-12 max-w-[90%] mx-auto">
      <div className="max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-medium text-primary-600 mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-primary-400 mb-10">
          We&apos;d love to hear from you! Whether you have a question about our
          products or just want to say hi, feel free to reach out.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 text-left"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl  bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl  bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 rounded-xl  bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`bg-black text-white py-3 px-10 rounded-xl hover:bg-primary-800 transition-colors duration-300 ${
              status === "sending" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent!"
              : "Send Message"}
          </button>
        </form>
      </div>
      <div className="mx-auto md:mt-auto relative">
        <Image
          alt=""
          width={500}
          height={500}
          className="object-contain"
          src="/contactUs.png"
        />
      </div>
    </section>
  );
}
