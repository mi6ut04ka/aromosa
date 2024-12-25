'use client';

import React, { useState, useEffect } from "react";
import { fetchImage } from "@/app/lib/fetchImage";
import { apiRequest } from "@/app/lib/api";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null); 
  const [imageURL, setImageURL] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const { id } = React.use(params); 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!id) {
          throw new Error("ID не передан");
        }

        const data = await apiRequest(`/products/${id}`);

        if (!data) {
          throw new Error("Продукт не найден");
        }

        setProduct(data);

        const imageUrl = await fetchImage(data.image); 
        setImageURL(imageUrl);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Секция с изображением */}
        <div className="flex-1 sm:w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
          <Image
            width={500}
            height={500}
            src={imageURL || "/default-image.jpg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Секция с информацией о продукте */}
        <div className="flex-1 sm:w-2/3">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">{product.price} ₽</span>
              {product.in_stock ? (
                <span className="text-green-600 font-semibold">В наличии</span>
              ) : (
                <span className="text-red-600 font-semibold">Нет в наличии</span>
              )}
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Добавить в корзину
            </button>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Характеристики</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Размер:</strong> {product.size || "Не указано"}</li>
              <li><strong>Вес:</strong> {product.weight || "Не указан"}</li>
              {/* Здесь можно добавить другие характеристики */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
