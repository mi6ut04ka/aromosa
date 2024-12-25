'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CandlesPage() {
  const categories = [
    {
      id: 1,
      name: 'Формовые свечи',
      image: '/images/molded-category.jpg',
      link: '/products/candles/molded',
      description: 'Изящные свечи в форме цветов, фигур и геометрических объектов.',
    },
    {
      id: 2,
      name: 'Контейнерные свечи',
      image: '/images/container-category.jpg',
      link: '/products/candles/container',
      description: 'Свечи в стильных контейнерах для вашего дома.',
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Категории свечей</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={category.link}>
            <div className="border rounded-lg overflow-hidden shadow-lg group">
              <div className="relative h-[200px] sm:h-[300px]">
                <Image
                  fill={true}
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
