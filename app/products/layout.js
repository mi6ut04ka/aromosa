'use client'

import NextBreadcrumbs from "../components/ui/NextBreadcrumbs";
import { apiRequest } from "../lib/api";
import React, { useCallback } from "react";

  
export default function ProductsLayout({ children }) {

  const getTextGenerator = (param) => {
    const id = !isNaN(Number(param)) ? Number(param) : null;


    if (id) {
      return async () => {
        const response = await apiRequest(`/products/${param}`);
        return response.name; 
      };
    }
    return null;
  }



    return (
      <>
        <NextBreadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={(path) => {
          const customNames = {
            candles: 'Свечи',
            molded: 'Формовые свечи',
            container: 'Контейнерные свечи',
            products: 'Продукция',
            gypsum: 'Гипсовые изделия',
            sets: 'Наборы',
            stands: 'Подставки',
            statues: 'Статуэтки',
            vases: 'Вазы'
          };
          return customNames[path] || path.replace(/-/g, ' ').charAt(0).toUpperCase() + path.slice(1);
        }}
        />
        <>
          {children}
        </>
      </>
    );
  }
  