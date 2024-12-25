import Image from "next/image";
import Link from "next/link";

export default function CartModal({ items = [] }) {
    return (
      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-80 z-50 border">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>
  
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Корзина пуста</p>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <Image
                  width={64}
                  height={64}
                  src={item.image}
                  alt={item.name}
                  quality={10}
                  className="object-cover rounded border"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Количество: {item.quantity}</p>
                  <p className="text-gray-500 text-sm">
                    Цена: {item.price.toLocaleString()} руб.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
  
        {items.length > 0 && (
          <div className="border-t pt-4 mt-4 text-sm">
            <p className="font-semibold">
              Итого:{" "}
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}{" "}
              руб.
            </p>
          </div>
        )}

        <div className="mt-4 flex gap-4">
          <Link href={'/cart'} >
            <button className="flex-grow bg-gray-200 rounded py-2 text-sm hover:bg-gray-300">
              Перейти в корзину
            </button>
          </Link>
          <Link href={'/cart/checkout'}>
            <button className="flex-grow bg-red-500 text-white rounded py-2 text-sm hover:bg-red-600">
              Оформить
            </button>
          </Link>
        </div>
      </div>
    );
  }
  