"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
  const blogPosts = [
    {
      title: "Top 5 Headphones for Audiophiles",
      excerpt:
        "Discover the best headphones that deliver immersive sound quality.",
      image: "/blog.png",
      href: "/blog/top-5-headphones",
    },
    {
      title: "How to Choose the Right Earbuds",
      excerpt:
        "Tips and tricks to help you select earbuds that match your lifestyle.",
      image: "/blog2.png",
      href: "/blog/choose-earbuds",
    },
    {
      title: "The Science Behind Noise Cancellation",
      excerpt: "Learn how active noise cancellation works and why it matters.",
      image: "/blog3.png",
      href: "/blog/noise-cancellation",
    },
    {
      title: "Wireless vs Wired: Which is Better?",
      excerpt: "A comparison of wireless and wired audio for different needs.",
      image: "/blog4.png",
      href: "/blog/wireless-vs-wired",
    },
    {
      title: "Best Accessories for Music Lovers",
      excerpt: "Top-rated accessories to elevate your audio experience.",
      image: "/blog5.png",
      href: "/blog/best-accessories",
    },
    {
      title: "Caring for Your Audio Gear",
      excerpt:
        "Maintenance tips to extend the life of your headphones and earbuds.",
      image: "/blog6.png",
      href: "/blog/audio-care",
    },
  ];

  return (
    <section className="py-32 max-w-[80%] mx-auto ">
      <h2 className="text-5xl font-medium mb-16 text-left">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.href}
            className="bg-primary-200 rounded-3xl overflow-hidden duration-300 group hover:scale-[1.03] transition-transform"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-primary-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={post.href}
                className="text-primary-500 font-medium hover:underline underline-offset-4"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
