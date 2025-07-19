import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

function HomeCollection() {
  return (
    <section className="sm:pt-16 pb-16">
      <div className="max-w-[90%] sm:max-w-[80%] mx-auto relative">
        <h2 className="text-4xl font-medium mb-14">Shop Collection</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="bg-primary-200 rounded-3xl p-8 h-[520px] md:h-[680px] relative flex flex-col justify-end">
            <div className="relative w-[80%] h-[80%] mx-auto mt-5 mb-14">
              <Image
                src="/products/sonyh1.png"
                alt="Headband"
                fill
                className="object-contain"
              />
            </div>
            <div className="mb-4 ml-4">
              <h2 className="text-4xl font-medium text-black mb-3">Headband</h2>
              <Link
                href={{ pathname: "/shop", query: { category: "headphone" } }}
                className="text-base text-black underline underline-offset-4 flex items-center gap-1"
              >
                Collection{" "}
                <span>
                  <BiRightArrowAlt />
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-primary-200 rounded-3xl p-6 sm:pl-10 h-[250px] sm:h-[330px] relative flex items-center justify-between gap-2">
              <div className="w-1/2 lg:w-1/3">
                <h2 className="text-2xl lg:text-4xl font-medium text-black mb-3">
                  Earbuds
                </h2>
                <Link
                  href={{ pathname: "/shop", query: { category: "earbuds" } }}
                  className="text-base text-black underline underline-offset-4 flex items-center gap-1"
                >
                  Collection
                  <span>
                    <BiRightArrowAlt />
                  </span>
                </Link>
              </div>
              <div className="relative w-1/2 lg:w-2/3 h-full">
                <Image
                  src="/products/beats10.png"
                  alt="Earbuds"
                  fill
                  className="object-contain"
                  style={{ objectPosition: "right" }}
                />
              </div>
            </div>
            <div className="bg-primary-200 rounded-3xl p-6 pb-0 sm:pl-10 h-[250px] sm:h-[330px] relative flex items-center justify-between gap-2">
              <div className="w-1/2 lg:w-1/3">
                <h2 className="text-2xl lg:text-4xl font-medium text-black mb-3">
                  Accessories
                </h2>
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: "accessories" },
                  }}
                  className="text-base text-black underline underline-offset-4 flex items-center gap-1"
                >
                  Collection
                  <span>
                    <BiRightArrowAlt />
                  </span>
                </Link>
              </div>
              <div className="relative w-1/2 lg:w-2/3 h-full">
                <Image
                  src="/products/beatsc1.png"
                  alt="Accessories"
                  fill
                  className="object-contain"
                  style={{ objectPosition: "bottom right" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCollection;
