'use client';

import Link from 'next/link';

export default function UserLayout({ children }) {

  return (

      <>
        <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>
            <div className="flex gap-6">
                <div className="w-1/4 p-6 ">
                    <div className="mb-6 flex flex-col space-y-4"> 
                        <Link href="/user/profile" className="px-4 py-2 rounded-md bg-gray-600 text-white">
                            Мой профиль
                        </Link>
                        <Link href="/user/orders" className="px-4 py-2 rounded-md bg-gray-600 text-white">
                            История заказов
                        </Link>
                        <Link href="/user/address" className="px-4 py-2 rounded-md bg-gray-600 text-white">
                            Адрес доставки
                        </Link>
                    </div>
                </div>

            <div className="flex-1  p-6">
                {children}
            </div>
        </div>
      </>

  );
}
