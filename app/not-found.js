'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-700">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-600">
          Страница не найдена
        </p>
        <p className="mt-2 text-gray-500">
          Возможно, вы ввели неправильный адрес или страница была удалена.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="px-6 py-3 text-lg"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
