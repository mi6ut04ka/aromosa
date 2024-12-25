import { apiRequest } from '../lib/api';
import ProductGrid from './ProductGrid';

export default async function NewProducts() {
    const products = await apiRequest('/products/new');

  return (
    <section className="py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Новинки
        </h2>
        <ProductGrid products={products}/>
      </section>
  )  
};
