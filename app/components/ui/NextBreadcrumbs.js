'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';

const _defaultGetTextGenerator = (param, query) => null;
const _defaultGetDefaultTextGenerator = (path) =>
  path.replace(/-/g, ' ').charAt(0).toUpperCase() + path.slice(1);

const generatePathParts = (pathStr) => {
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

export default function NextBreadcrumbs({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams(); 

  const breadcrumbs = useMemo(() => {
    const pathnameNestedRoutes = generatePathParts(pathname);

    const crumbList = pathnameNestedRoutes.map((subpath, idx) => {
      const param = subpath.replace('[', '').replace(']', '');
      const href = '/' + pathnameNestedRoutes.slice(0, idx + 1).join('/');

      return {
        href,
        textGenerator: getTextGenerator(param, searchParams),
        text: getDefaultTextGenerator(subpath, href),
      };
    });

    return [{ href: '/', text: 'Главная' }, ...crumbList];
  }, [pathname, searchParams, getTextGenerator, getDefaultTextGenerator]);

  return (
    <nav aria-label="breadcrumb" className='mb-6'>
      <ul className="flex space-x-2 text-gray-500">
        {breadcrumbs.map((crumb, idx) => (
          <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
        ))}
      </ul>
    </nav>
  );
}

function Crumb({ text: defaultText, textGenerator, href, last = false }) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    if (!textGenerator) return;
    const fetchText = async () => {
      const finalText = await textGenerator();
      setText(finalText);
    };
    fetchText();
  }, [textGenerator]);

  if (last) {
    return <span className="font-bold text-black">{text}</span>;
  }

  return (
    <li>
      <Link href={href} className="hover:underline">
        {text}
      </Link>
      <span className="mx-2">/</span>
    </li>
  );
}
