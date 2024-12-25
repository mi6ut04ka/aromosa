'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const categories = [
    {
      id: 1,
      title: 'Свечи',
      description: 'Добавьте уют с нашими ароматными свечами.',
      image: '/images/candles/main.jpg',
      link: '/products/candles',
    },
    {
      id: 2,
      title: 'Гипсовые изделия',
      description: 'Элегантные изделия для вашего интерьера.',
      image: '/images/gypsum/main.jpg',
      link: '/products/gypsum',
    },
    {
      id: 3,
      title: 'Наборы',
      description: 'Идеальный подарок для ваших близких.',
      image: '/images/sets/main.jpg',
      link: '/products/sets',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Категории продукции</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden bg-white"
          >
            <Link href={category.link}>
              <div className="block">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
