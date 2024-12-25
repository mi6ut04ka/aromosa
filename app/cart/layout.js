'use client'
import NextBreadcrumbs from "../components/ui/NextBreadcrumbs";

export default function layout({children}) {
    return (
        <>
        <NextBreadcrumbs
                getDefaultTextGenerator={(path) => {
                  const customNames = {
                    'cart': 'Корзина',
                    'checkout': 'Оформление заказа'
                  };
                  return customNames[path] || path.replace(/-/g, ' ').charAt(0).toUpperCase() + path.slice(1);
                }}
                />
        {children}
        </>
    )
};
