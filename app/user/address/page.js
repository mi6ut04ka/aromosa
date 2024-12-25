'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressPage() {
  const router = useRouter();
  
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Функция для сохранения адреса
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Здесь можно добавить логику для сохранения адреса, например, через API
    // Пример:
    // const response = await apiRequest('/saveAddress', { city, street, postalCode, country });

    // Для этого примера просто выводим данные в консоль
    console.log('Сохраненный адрес:', { city, street, postalCode, country });

    setIsSaving(false);
    // После сохранения можно перенаправить пользователя, например, на страницу профиля
    router.push('/user/profile');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Редактировать адрес доставки</h1>
        <form onSubmit={handleSaveAddress}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="city">Город</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Введите город"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="street">Улица</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Введите улицу"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="postalCode">Почтовый индекс</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Введите почтовый индекс"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="country">Страна</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Введите страну"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              disabled={isSaving}
            >
              {isSaving ? 'Сохраняем...' : 'Сохранить'}
            </button>
          </div>
        </form>
    </div>
  );
}
