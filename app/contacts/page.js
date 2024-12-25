'use client';

export default function ContactsPage() {
  const contactInfo = [
    {
      id: 1,
      title: 'Адрес',
      description: 'г. Москва, ул. Примерная, д. 123, офис 456',
    },
    {
      id: 2,
      title: 'Телефон',
      description: '+7 (123) 456-78-90',
    },
    {
      id: 3,
      title: 'Электронная почта',
      description: 'info@example.com',
    },
    {
      id: 4,
      title: 'Часы работы',
      description: 'Пн-Пт: 09:00 - 18:00, Сб-Вс: выходной',
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="space-y-6">
        {contactInfo.map((info) => (
          <div key={info.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{info.title}</h2>
            <p className="text-gray-600">{info.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Форма обратной связи</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ваше имя</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Ваш Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Сообщение</label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
