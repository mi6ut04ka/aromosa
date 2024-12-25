'use client'
import { Suspense } from 'react';
import NextBreadcrumbs from "../components/ui/NextBreadcrumbs";

export default function Layout({ children }) {
  
  return (
    <>
      <Suspense fallback={<div>Загрузка...</div>}>
        <NextBreadcrumbs
          getDefaultTextGenerator={(path) => {
            const customNames = {
              cart: 'Корзина',
              checkout: 'Оформление заказа',
            };
            return customNames[path] || path.replace(/-/g, ' ').charAt(0).toUpperCase() + path.slice(1);
          }}
        />
      </Suspense>
      {children}
    </>
  );
}
