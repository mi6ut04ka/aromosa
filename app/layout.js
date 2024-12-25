import './globals.css';
import localFont from 'next/font/local';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'Aromosa - Candles & Gifts',
  description: 'Explore our unique collection of candles, gypsum items, and gift sets.',
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat'
});


const brillant = localFont({
  src: './fonts/brillant.otf',
  variable: '--font-brillant',
});

const cruinn = localFont({
  src: [
    {
      path: './fonts/CruinnLight.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/CruinnMedium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/CruinnRegular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/CruinnThin.ttf',
      weight: '100',
      style: 'normal'
    }
  ]

})



export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${cruinn.className} ${brillant.variable} ${montserrat.variable} font-brillant`}>
        <UserProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen container sm:mx-auto md:px-[80px] px-[20px] ">
              <Navbar />
              <main className='flex-grow'>
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
