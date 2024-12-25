'use client';

import { apiRequest } from '../lib/api';
import { useCart } from '../components/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, updateCart, setCartItems } = useCart();

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item || (item.quantity <= 1 && delta < 0)) return;
  
    if (delta === 1) {
      await apiRequest(`/cart/add`, 'POST', { product_id: id, quantity: 1 });
    } else {
      await apiRequest(`/cart/update`, 'PATCH',{ product_id: id });
    }
  
    await updateCart();
  };

  const handleRemoveItem = async (id) => {
    await apiRequest(`/cart/remove/${id}`, 'DELETE');
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const CartItem = ({item}) => {
    return (
      <div
      key={item.id}
      className="flex items-center border rounded-lg p-4 shadow-md"
    >
        <Image
          width={96}
          height={96}
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md mr-4"
        />
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
        {item.oldPrice && (
          <p className="text-sm text-gray-400 line-through">
            {item.oldPrice} ₽
          </p>
        )}
        <p className="text-gray-600">{item.price} ₽</p>
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={() => handleQuantityChange(item.id, -1)}
            className="px-2 py-1 border rounded-md hover:bg-gray-100"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.id, 1)}
            className="px-2 py-1 border rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="text-red-600 hover:underline ml-4"
      >
        Удалить
      </button>
    </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
          { cartItems.map((item) => (
             <CartItem key={item.id} item={item}/>
          ))}
          </div>
          <div className="lg:col-span-1 border rounded-lg p-4 shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Итого:</h2>
              <p className="text-2xl font-bold text-gray-800">{calculateTotal()} ₽</p>
            </div>
            
              <Link href={'/cart/checkout'}>
                <button
                  className="w-full py-2 px-4 mb-2 bg-white border border-gray-600 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white">
                  Оформить
                </button>
              </Link>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Промокод
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2 mb-2"
              />
              <button
                className="w-full py-2 px-4 bg-white border border-gray-600 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      
    </div>
  );
}


