'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { useCart } from '../components/CartContext';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { cartItems } = useCart();



  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Избранное</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <ProductCard key={item.id} product={item} isFavorite={true}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300">Вы еще не добавили товары в избранное.</p>
      )}
    </div>
  );
}
