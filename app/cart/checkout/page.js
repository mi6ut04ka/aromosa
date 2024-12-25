'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/app/components/UserContext';
import { useCart } from '@/app/components/CartContext';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('onDelivery');
  const [coupon, setCoupon] = useState('');
  const [comment, setComment] = useState('');
  const { user } = useUser();
  const { cartItems } = useCart();

  useEffect(()=>{
    user? null : redirect('/');
  },[])

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCost = deliveryMethod === 'pickup' ? 0 : 200;
    return itemsTotal + deliveryCost;
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const applyCoupon = () => {
    // Здесь можно реализовать логику для применения купона
    alert(`Купон "${coupon}" применен`);
  };

  useEffect(() => {
    // Пример: при изменении способа доставки можно добавить логику расчёта доставки
    console.log(`Delivery method changed: ${deliveryMethod}`);
  }, [deliveryMethod]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 font-montserrat">Оформление заказа</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Покупатель</h2>
          <form className="space-y-4">
            {user ? (
              <>
                <div>
                  <label className="block text-sm font-medium">E-mail *</label>
                  <input type="email" value={user.email} className="w-full p-2 border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium">Имя *</label>
                  <input type="text" value={user.name} className="w-full p-2 border rounded-md" readOnly />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium">E-mail *</label>
                  <input type="email" className="w-full p-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Имя *</label>
                  <input type="text" className="w-full p-2 border rounded-md" required />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium">Фамилия *</label>
              <input type="text" className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Контактный телефон *</label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="+7(999)999-99-99" required />
            </div>
          </form>

          {/* Способ доставки */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Способ доставки</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => handleDeliveryChange('pickup')}
                  className="form-radio"
                />
                Самовывоз (бесплатно)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={deliveryMethod === 'courier'}
                  onChange={() => handleDeliveryChange('courier')}
                  className="form-radio"
                />
                Курьер (200 руб.)
              </label>
            </div>
          </div>

          {/* Способ оплаты */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="onDelivery"
                  checked={paymentMethod === 'onDelivery'}
                  onChange={() => handlePaymentChange('onDelivery')}
                  className="form-radio"
                />
                При получении (наличными или картой)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bankTransfer"
                  checked={paymentMethod === 'bankTransfer'}
                  onChange={() => handlePaymentChange('bankTransfer')}
                  className="form-radio"
                />
                Банковский перевод
              </label>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Промокод и комментарии к заказу</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Прмокод</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    type="button"
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={applyCoupon}
                  >
                    Применить
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Комментарии</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Укажите ваши пожелания"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Корзина */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Мой заказ</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{item.price * item.quantity} руб.</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <span>Стоимость заказа</span>
              <span>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} руб.</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Стоимость доставки</span>
              <span>{deliveryMethod === 'pickup' ? 'Бесплатно' : '200 руб.'}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mt-2">
              <span>Итого</span>
              <span>{calculateTotal()} руб.</span>
            </div>
          </div>
          <button className="w-full mt-4 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
