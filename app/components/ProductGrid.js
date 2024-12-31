import ProductCard from './ProductCard/ProductCard';

export default async function ProductGrid(props) {
  try {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {await props.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Ошибка загрузки продуктов:', error);
    return <p>Не удалось загрузить продукты.</p>;
  }
}
