'use client';
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { apiRequest } from '../lib/api';
import { fetchImage } from '../lib/fetchImage';
import { useUser } from './UserContext';
import { usePathname } from 'next/navigation';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [loadingCartItems, setLoadingCartItems] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isNewItem, setIsNewItem] = useState(false);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  const { user } = useUser(); 
  const pathname = usePathname();

  useEffect(()=>{
    if (user) updateCart();
  }, []);

  const updateCart = useCallback(async () => {
    setLoadingCartItems(true);
    const _cartItems = await apiRequest('/cart');
    const itemsWithImages = await Promise.all(
      _cartItems.map(async (item) => {
        try {
          const image = await fetchImage(item.image);
          return { ...item, image };
        } catch (error) {
          console.error('Ошибка загрузки изображения:', error);
          return { ...item, image: '/placeholder.png' };
        }
      })
    );

    if (isCartInitialized) {
      if(pathname !='/cart'){
        console.log(pathname)
        const isNew =
        itemsWithImages.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) >
        cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
      setIsNewItem(isNew);
      }
      
    } else {
      setIsCartInitialized(true);
    }

    setCartItems(itemsWithImages);
    setLoadingCartItems(false);
  }, [isCartInitialized, cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCart,
        loadingCartItems,
        setCartItems,
        isNewItem,
        setIsNewItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
