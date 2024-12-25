import { apiRequest } from '../lib/api';
import ProductGrid from './ProductGrid';

export default async function BestSellers() {
    const products = await apiRequest('/products/bestsellers');

  return (
    <section className="py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Хиты продаж
        </h2>
        <ProductGrid products={products}/>
      </section>
  )  
};
