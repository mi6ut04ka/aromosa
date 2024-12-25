'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      title: 'Уникальные и натуральные свечи',
      description: 'Добавьте уют в ваш дом с нашими ароматическими свечами',
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      title: 'Гипсовые изделия',
      description: 'Элегантные подставки, вазы, статуэтки для вашего интерьера',
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      title: 'Подарочные наборы',
      description: 'Идеальный подарок для друзей и близких',
    },
  ];

  return (
    <div className="container mx-auto relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        speed={1200}
        loop
        className="md:h-[750px] h-[500px] md:rounded-tl-[120px] md:rounded-br-[120px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill={true}
              quality={75}
              priority={false}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
              <h2 className="font-montserrat text-3xl md:text-5xl font-bold mb-4">
                {slide.title.toLocaleUpperCase()}
              </h2>
              <p className="text-lg md:text-4xl">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
