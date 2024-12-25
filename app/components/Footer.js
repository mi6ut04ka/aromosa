export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Информация</h4>
            <ul>
              <li>О магазине</li>
              <li>Оплата</li>
              <li>Доставка</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Личный кабинет</h4>
            <ul>
              <li>Вход</li>
              <li>Регистрация</li>
              <li>Забыли пароль?</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Мы в соц. сетях</h4>
            <ul>
              <li>Instagram</li>
              <li>Vkontakte</li>
            </ul>
          </div>
        </div>
        <p className="mt-6">&copy; 2024 Aromosa. Все права защищены.</p>
      </div>
    </footer>
  );
}
