export default function AboutPage() {
    return (
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">О магазине Aromosa</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Добро пожаловать в Aromosa! Мы специализируемся на создании уникальных и качественных товаров, которые наполнят
          ваш дом уютом и стилем.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Наша коллекция включает:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Декоративные свечи ручной работы</li>
          <li>Гипсовые изделия, включая статуэтки и вазы</li>
          <li>Наборы для подарков и домашнего декора</li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Каждый наш продукт создан с любовью и вниманием к деталям. Мы стремимся предоставить вам лучшие товары для
          создания гармоничной и уютной атмосферы в вашем доме.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Благодарим за выбор Aromosa. Мы всегда рады помочь вам в выборе продукции, а также ответить на любые вопросы!
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Наши контакты</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Адрес: Иркутск, ул. Примерная, 123
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Телефон: <a href="tel:+79991234567" className="text-indigo-600 hover:underline">+7 (999) 123-45-67</a>
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Email: <a href="mailto:info@aromosa.ru" className="text-indigo-600 hover:underline">info@aromosa.ru</a>
        </p>
      </div>
    );
  }
  