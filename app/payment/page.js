'use client';

export default function PaymentPage() {
  const paymentOptions = [
    {
      id: 1,
      title: 'Онлайн-оплата',
      description:
        'Оплачивайте заказы онлайн с помощью банковской карты, электронного кошелька или системы интернет-банкинга.',
    },
    {
      id: 2,
      title: 'Наличный расчет',
      description:
        'Оплата наличными возможна при получении заказа курьером или в пункте самовывоза.',
    },
    {
      id: 3,
      title: 'Безналичный расчет',
      description:
        'Доступно для юридических лиц. Счет на оплату выставляется после оформления заказа.',
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Оплата</h1>
      <div className="space-y-6">
        {paymentOptions.map((option) => (
          <div key={option.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
