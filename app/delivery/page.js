'use client';

export default function DeliveryPage() {
  const deliveryOptions = [
    {
      id: 1,
      title: 'Курьерская доставка',
      description:
        'Доставка курьером до двери в течение 2-5 рабочих дней. Стоимость зависит от региона.',
    },
    {
      id: 2,
      title: 'Пункты самовывоза',
      description:
        'Вы можете забрать свой заказ из ближайшего пункта самовывоза. Услуга доступна в большинстве городов.',
    },
    {
      id: 3,
      title: 'Экспресс-доставка',
      description:
        'Доставка в течение 24 часов для жителей крупных городов. Стоимость фиксированная.',
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Доставка</h1>
      <div className="space-y-6">
        {deliveryOptions.map((option) => (
          <div key={option.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
