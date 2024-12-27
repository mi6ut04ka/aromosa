// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();
  
  // Устанавливаем CORS заголовки
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin');
  res.headers.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  return res;
}

// Matcher для всех API путей
export const config = {
    matcher: ['/api/*.json'], // Применяется только к API маршрутам с расширением .json
  };
