'use client'

import PaginatedFilterableList from "@/app/components/PaginatedFilterableList";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import ProductCardSkeleton from "@/app/components/ProductCard/ProductCardSkeleton";

import { apiRequest } from "@/app/lib/api";

const filtersConfig = [
  { name: 'priceFrom', label: 'Цена от', type: 'number' },
  { name: 'priceTo', label: 'Цена до', type: 'number' },
  { name: 'color', label: 'Цвет', type: 'select' },
  { name: 'inStock', label: 'В наличии', type: 'checkbox' },
];

export default function VasesPage() {
  
  const fetchItems = async (page, filters) => {
    const params = new URLSearchParams({
      page,
      ...filters,
    }).toString();

    const data = await apiRequest(`/products/vases?${params}`);
    return {
      items: data.gypsumProduct.data,
      totalPages: data.gypsumProduct.last_page,
    };
  };

  const fetchFilters = async () => {
    const data = await apiRequest('/products/vases');
    return data.filters || {};
  };

  return (
    <PaginatedFilterableList
      title="Вазы"
      fetchItems={fetchItems}
      fetchFilters={fetchFilters}
      filtersConfig={filtersConfig}
      renderItem={(product) => <ProductCard key={product.id} product={product} />}
      renderSkeleton={(index) => <ProductCardSkeleton key={index} />}
      noItemsMessage="Товары не найдены."
    />
  );
}
