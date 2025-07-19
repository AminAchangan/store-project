import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const headphoneProducts = [
  {
    name: "Bose SleepBuds",
    description:
      "Wired earphones, deep, rich bass tones, sweat and water resistant",
    price: 199.0,
    image_url: "/products/bose-sleepbuds.png",
    brand: "bose",
    type: "earbuds",
    gallery_images: [
      "/products/bose-sleepbuds.png",
      "/products/bose-sleepbuds-silver.png",
    ],
    color_image_map: {
      gold: "/products/bose-sleepbuds.png",
      silver: "/products/bose-sleepbuds-silver.png",
    },
  },
  {
    name: "Beats Solo3 Wireless",
    description:
      "High-performance wireless headphones with award-winning sound",
    price: 299.95,
    image_url: "/products/beats-solo3.png",
    brand: "beats",
    type: "earbuds",
    gallery_images: [
      "/products/beats-solo3.png",
      "/products/beats-solo3-purple.png",
      "/products/beats-solo3-pink.png",
    ],
    color_image_map: {
      blue: "/products/beats-solo3.png",
      pink: "/products/beats-solo3-pink.png",
      purple: "/products/beats-solo3-purple.png",
    },
  },
  {
    name: "Apple AirPods Pro 2",
    description:
      "Active Noise Cancellation, Transparency mode, and incredible sound",
    price: 249.0,
    image_url: "/products/airpods-pro2.png",
    brand: "apple",
    type: "earbuds",
  },
  {
    name: "Skullcandy Crusher Wireless",
    description: "Powerful, immersive bass you can feel",
    price: 199.99,
    image_url: "/products/skullcandy-rail.png",
    brand: "skullcandy",
    type: "headphone",
  },
  {
    name: "Bose QuietComfort 35 II",
    description: "World-class noise cancellation, balanced audio performance",
    price: 299.0,
    image_url: "/products/bose-quietcomfort.png",
    brand: "bose",
    type: "earbuds",
  },
  {
    name: "Sennheiser HD 660 S",
    description: "Audiophile-grade open-back headphones, exceptional clarity",
    price: 499.0,
    image_url: "/products/sennheiser-HD-660S.png",
    brand: "sennheiser",
    type: "headphone",
  },
  {
    name: "Sony WH-1000XM5",
    description: "Eight-driver earphones, reference sound, exceptional detail",
    price: 1499.0,
    image_url: "/products/sony1000.png",
    brand: "sony",
    type: "headphone",
  },
  {
    name: "Beats Studio3 Wireless",
    description:
      "Premium noise cancelling headphones, real-time audio calibration",
    price: 349.95,
    image_url: "/products/beats-studio3.png",
    brand: "beats",
    type: "earbuds",
  },
  {
    name: "Apple AirPods Max",
    description:
      "High-fidelity audio, Active Noise Cancellation, and spatial audio",
    price: 549.0,
    image_url: "/products/airpods-max.png",
    brand: "apple",
    type: "headphone",
  },
  {
    name: "Skullcandy Indy ANC",
    description:
      "True wireless earbuds, active noise cancelling, water resistant",
    price: 129.99,
    image_url: "/products/skullcandy-indy.png",
    brand: "skullcandy",
    type: "earbuds",
  },
  {
    name: "Bose Noise Cancelling Headphones 700",
    description: "Powerful noise cancellation, astonishing sound",
    price: 379.0,
    image_url: "/products/bose700.png",
    brand: "bose",
    type: "headphone",
  },
  {
    name: "Beats Studio Pro",
    description:
      "Superior sound, luxurious design, and advanced noise cancellation",
    price: 399.95,
    image_url: "/products/beats_studio_pro.png",
    brand: "beats",
    type: "headphone",
  },
  {
    name: "Sony In-Ear",
    description:
      "Custom in-ear monitors, eight drivers per ear, ultimate sound",
    price: 1899.0,
    image_url: "/products/sony-in-ear.png",
    brand: "sony",
    type: "earbuds",
  },
  {
    name: "Beats Powerbeats Pro",
    description: "Totally wireless earphones, high-performance workout earbuds",
    price: 249.95,
    image_url: "/products/power-beats.png",
    brand: "beats",
    type: "headphone",
  },
  {
    name: "Skullcandy Hesh 3 Wireless",
    description:
      "Wireless over-ear headphones, rapid charge, noise isolating fit",
    price: 99.99,
    image_url: "/products/skullcandy_Hesh3.png",
    brand: "skullcandy",
    type: "headphone",
  },
  {
    name: "Bose Sport Earbuds",
    description:
      "True wireless earbuds, sweat and weather resistant, powerful audio",
    price: 179.0,
    image_url: "/products/bose_sport.png",
    brand: "bose",
    type: "earbuds",
  },
  {
    name: "Sennheiser Momentum 4 Wireless",
    description:
      "High-fidelity headphones, open-back design, reference-class sound",
    price: 1699.95,
    image_url: "/products/sennheiser_Momentum.png",
    brand: "sennheiser",
    type: "headphone",
  },
  {
    name: "Sony 720N",
    description: "Five balanced armature drivers, professional in-ear monitors",
    price: 749.0,
    image_url: "/products/sony720.png",
    brand: "sony",
    type: "headphone",
  },
  {
    name: "Beats Flex Wireless Earbuds",
    description: "All-day wireless listening, magnetic earbuds, auto-pause",
    price: 69.95,
    image_url: "/products/beats-flex.png",
    brand: "beats",
    type: "earbuds",
  },
  {
    name: "Apple AirPods (3rd generation)",
    description:
      "Spatial audio, adaptive EQ, contoured fit, force sensor control",
    price: 179.0,
    image_url: "/products/airpods-3rd-gen.png",
    brand: "apple",
    type: "earbuds",
  },
];
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function uploadHeadphones() {
  const { error } = await supabase.from("products").insert(headphoneProducts);
  if (error) {
    console.error("❌ Upload failed:", error.message);
  } else {
    console.log("✅ Upload success!");
  }
}

uploadHeadphones();
