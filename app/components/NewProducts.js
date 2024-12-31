'use client';

import { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import { apiRequest } from '../lib/api';

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await apiRequest('/products/new');
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Новинки
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
