'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GypsumPage() {
  const categories = [
    {
      id: 1,
      name: 'Подставки',
      image: '/images/gypsum-stands.jpg',
      link: '/products/gypsum/stands',
      description: 'Элегантные подставки из гипса для дома и офиса.',
    },
    {
      id: 2,
      name: 'Статуэтки',
      image: '/images/gypsum-statues.jpg',
      link: '/products/gypsum/statues',
      description: 'Изящные гипсовые статуэтки для декора интерьера.',
    },
    {
      id: 3,
      name: 'Вазы',
      image: '/images/gypsum-vases.jpg',
      link: '/products/gypsum/vases',
      description: 'Красивые гипсовые вазы для цветов и декора.',
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Гипсовые продукты</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={category.link}>
            <div className="border rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <div className="relative h-[200px] sm:h-[300px]">
                <Image
                  fill={true}
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">
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