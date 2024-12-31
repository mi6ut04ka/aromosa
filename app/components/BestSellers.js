'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import ProductGrid from './ProductGrid';

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest('/products/bestsellers');
        setProducts(response);
      } catch (err) {
        setError(err.message || 'Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center">Нет доступных хитов продаж</div>;
  }

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Хиты продаж
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
