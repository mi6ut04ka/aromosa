import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-[25px]">
      <div className="flex flex-col-reverse gap-[95px] md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-[52px] font-bold text-gray-600 mb-6 leading-tight font-montserrat">
          {'Создайте уют с нашими изделиями'.toLocaleUpperCase()}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Узнайте важное о правилах ухода за свечами, больше  о бренде и другая полезная информация.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link
              href="/about"
              className="px-6 py-3 text-gray-600 hover:text-white hover:bg-gray-600 border border-gray-300 rounded-[30px] text-lg font-medium transition"
            >
              Узнать больше
            </Link>
          </div>
        </div>

        <div className="md:w-[492px] mt-10 md:mt-0 px-6 relative">
          <div className="relative max-w-full">
            <Image
              width={492}
              height={649}
              src="/images/hero-image.jpg"
              alt="Свечи и изделия"
              className="shadow-lg rounded-tl-[120px] rounded-md relative z-10"
              priority={false}
            />
            <div className="absolute -top-[25px] left-20 md:-top-[25px] md:left-32 w-5/6 h-5/6 border border-black  rounded-tl-[140px] rounded-md "></div>
            <div className="absolute top-[100px] right-20 md:top-[125px] md:right-32 w-5/6 h-5/6 border border-black rounded-tl-[140px] rounded-md "></div>
          </div>
        </div>
      </div>
    </section>
  );
}
