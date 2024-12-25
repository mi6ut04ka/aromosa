'use client';

import { useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/api";
import Spinner from "@/app/components/ui/Spinner";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('/user/orders');
        setOrders(data);
      } catch (err) {
        setError("Ошибка при загрузке истории заказов.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">История заказов</h2>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">У вас еще нет заказов.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold">Заказ #{order.id}</h3>
              <p>Статус: {order.status}</p>
              <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
              <p>Сумма: {order.totalAmount} ₽</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
