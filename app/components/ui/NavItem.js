import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ item, isMobile = false }) {
  const pathname = usePathname();

  return (
    <Link
      href={item.link}
      className={`${
        pathname.includes(item.link) ? 'bg-gray-200 rounded-full' : ''
      } ${isMobile ? 'block text-xl px-4 py-2' : 'hover:rounded-full py-2 px-4'} 
      hover:bg-gray-200 transition-all duration-300`}
    >
      {item.name}
    </Link>
  );
}
