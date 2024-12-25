'use client';
import { useEffect, useState } from 'react';
import { fetchImage } from '../../lib/fetchImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import style from './productCard.css';
import { apiRequest } from '@/app/lib/api';
import { useCart } from '../CartContext';

export default function ProductCard({ product, isFavorite = false }) {
  const { updateCart } = useCart();
  const [imageSrc, setImageSrc] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    async function loadImage() {
      if (!favorite) {
        const image = await fetchImage(product.image || product.photos[0]?.url);
        setImageSrc(image);
      }
      else {
        setImageSrc(product.image);
      }
    }
    loadImage();
  }, [product.image, favorite]);

  const handleAddToCart = async () => {
    if (!product.in_stock) {
      alert('Товара нет в наличии');
      return;
    }

    try {
      setIsAddingToCart(true);

      await apiRequest('/cart/add', 'POST', {
        product_id: product.id,
        quantity: 1,
      });
      await updateCart();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось добавить товар в корзину');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (favorite) {
        // Удаляем из избранного
        await apiRequest('/favorites/remove', 'POST', { product_id: product.id });
      } else {
        // Добавляем в избранное
        await apiRequest('/favorites/add', 'POST', { product_id: product.id });
      }
      setFavorite(!favorite);
    } catch (error) {
      console.error('Ошибка изменения избранного:', error);
      alert('Не удалось изменить статус избранного');
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white hover:shadow-xl transition-shadow">
      <div className="relative">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name || product.full_name}
            quality={30}
            width={300}
            height={300}
            className="object-cover w-full h-[400px]"
          />
        ) : (
          <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={handleFavoriteToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
              favorite ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-red-500'
            } group transition-colors`}
            title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <FontAwesomeIcon
              icon={favorite ? faTimes : faHeart}
              className="text-white"
            />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !product.in_stock}
            className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ${
              product.in_stock
                ? 'hover:bg-green-500'
                : 'cursor-not-allowed opacity-50'
            } group transition-colors`}
            title={product.in_stock ? 'Добавить в корзину' : 'Нет в наличии'}
          >
            <FontAwesomeIcon
              icon={faCartPlus}
              className="text-black group-hover:text-white"
            />
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name || product.full_name}</h3>
        <p className="text-gray-500 text-sm mt-1">В наличии: {product.in_stock}</p>
        <p className="text-gray-700 text-sm mt-auto font-bold">Цена: {product.price} ₽</p>
      </div>
    </div>
  );
}
