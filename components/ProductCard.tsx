import Image from "next/image";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  badge?: string;
};

export default function ProductCard({ id, title, image, price, badge }: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div onClick={handleClick} className="group mx-auto cursor-pointer">
      <div className="relative bg-gray-100 p-4 h-[270px] sm:min-w-[220px] sm:h-[330px] w-full flex flex-col items-center justify-between rounded-3xl">
        <div className="w-full flex justify-between">
          {badge && (
            <span className="bg-white text-base font-semibold px-3 py-[2px] rounded-md flex items-center">
              {badge}
            </span>
          )}
          <span className="relative bg-white rounded-full p-1 shadow-md transition opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <MdOutlineFavoriteBorder className="w-6 h-6 text-gray-700" />
          </span>
        </div>
        <div className="relative w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] mx-auto transition-transform duration-300 group-hover:scale-90">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 264px"
            className="object-contain"
          />
        </div>
        <button className="text-white bg-primary-800 py-3 px-4 w-full rounded-xl transition opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 group-hover:translate-y-0">
          Add to cart
        </button>
      </div>
      <div className="mt-4 text-left">
        <div className="text-sm text-black font-semibold leading-tight">
          {title}
        </div>
        <div className="text-sm text-gray-600 mt-1">${price}</div>
      </div>
    </div>
  );
}
