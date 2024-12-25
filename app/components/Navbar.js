'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useUser } from './UserContext';
import Image from 'next/image';
import NavItem from './ui/NavItem';
import Search from './ui/Search';

const linkItems = [
  { link: '/products', name: 'Каталог' },
  { link: '/about', name: 'О нас' },
  { link: '/payment', name: 'Оплата' },
  { link: '/delivery', name: 'Доставка' },
  { link: '/contacts', name: 'Контакты' },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { cartItems, updateCart, loadingCartItems, isNewItem, setIsNewItem } = useCart();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSearchOpen, setIsSerachOpen] = useState(false);
  const { user, setUser } = useUser();
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (user) updateCart();
  }, [user]);

  useEffect(() => {
    if (cartItems) {
      setCartQuantity(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }
  }, [cartItems]);

  useEffect(() => {
    if (isNewItem) {
      const timer = setTimeout(() => {
        setIsNewItem(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isNewItem]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleHamburger = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsHamburgerOpen(false);
  };

  const toggleSeach = () => {
    setIsSerachOpen((prev) => !prev)
  }

  return (
    <div className="relative flex justify-between items-center md:h-[149px] h-[100px]">
        {
          isSearchOpen &&
              <Search toggleSeach={toggleSeach}/>
        }
      <button onClick={toggleHamburger} className="block xl:hidden">
        <Image
          alt="Menu"
          src={'/icons/hamburger.svg'}
          width={30}
          height={30}
          className="cursor-pointer transition-transform duration-300"
        />
      </button>

      <div>
        <Link href="/" className="font-brillant md:text-4xl text-2xl">
          aromosa
        </Link>
      </div>

      <div className="hidden xl:flex font-light text-3xl">
        {linkItems.map((item) => (
          <NavItem key={item.link} item={item} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Image
          className="cursor-pointer"
          alt="Search"
          width={30}
          height={30}
          src={'/icons/Search.svg'}
          onClick={toggleSeach}
        />
        {user ? (
          <div className="flex items-center gap-2">
            <Link href="/favorites" className="text-gray-600 hover:text-indigo-600 relative">
              <Image
                className="cursor-pointer"
                alt="Favorite"
                width={30}
                height={30}
                src={'/icons/Favorite.svg'}
              />
            </Link>

            <div className="relative">
              <Link href="/cart" className="text-gray-600">
                <Image alt="Cart" width={30} height={30} src={'/icons/Cart.svg'} />
                <div className="absolute -right-2 -top-2 h-5 w-5 bg-red-600 rounded-full">
                  <span className="text-white text-xs absolute left-[55%] top-[55%] -translate-y-1/2 -translate-x-1/2">
                    {cartQuantity}
                  </span>
                </div>
              </Link>
              {loadingCartItems ? null : isNewItem && <CartModal items={cartItems} />}
            </div>

            <div
              className="relative w-100"
              onMouseEnter={() => setOpenMenu(true)}
              onMouseLeave={() => setOpenMenu(false)}
            >
              <Link href="/user/profile">
                <Image alt="User" width={30} height={30} src={'/icons/User.svg'} />
              </Link>
              {openMenu && (
                <div className="z-10 absolute top-8 left-1/2 -translate-x-1/2 bg-white border shadow-md rounded-md py-2 w-40">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link href="/login">
            <Image alt="Sign in" width={30} height={30} src={'/icons/Sign_in.svg'} />
          </Link>
        )}
      </div>

      <div
        className={`xl:hidden fixed top-0 left-0 z-50 h-full w-2/3 bg-white shadow-md transition-transform duration-500 ${
          isHamburgerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold">Меню</span>
          <button onClick={closeMenu}>
            <Image alt="Close" src="/icons/close.svg" width={30} height={30} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {linkItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={closeMenu}
              className="block text-lg hover:bg-gray-100 p-2 rounded-md transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
