import Image from "next/image";
import { CgMail } from "react-icons/cg";

function NewsLetter() {
  return (
    <section className="bg-primary-300 w-full h-auto py-20 lg:py-0 lg:pt-5">
      <div className="w-[80%] h-full flex justify-center lg:justify-between items-center max-w-6xl mx-auto">
        <Image
          key={1}
          src="/bgNews1.png"
          alt="Decorative background"
          width={150}
          height={150}
          className="hidden lg:block -rotate-[18deg]"
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="font-medium text-3xl sm:text-4xl mb-3">
            Join Our Newsletter
          </h1>
          <h3 className="text-base mb-10 text-primary-600">
            Sign up for deals, new products and promotions
          </h3>
          <div className="flex items-center justify-between pb-3 border-b-[1px] border-gray-400 w-full max-w-md">
            <div className="flex items-center">
              <CgMail className="text-gray-400 mr-2 h-6 w-6" />
              <input
                className="bg-primary-300 text-gray-500 placeholder-gray-400 w-full focus:outline-none"
                placeholder="Email address"
              />
            </div>
            <button className="text-sm text-gray-400 hover:text-gray-700 transition font-medium">
              Signup
            </button>
          </div>
        </div>
        <Image
          key={2}
          src="/NewsPic.png"
          alt="Newsletter promotion"
          width={200}
          height={200}
          className="hidden lg:block mb-[-10px]"
        />
      </div>
    </section>
  );
}

export default NewsLetter;
