import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
const url = req.nextUrl.pathname;

// Admin sayfalarını koru
if (url.startsWith('/admin')) {
const sessionToken = req.cookies.get('session-token')?.value;

// Eğer çerez yoksa → giriş sayfasına yönlendir
if (!sessionToken) {
  return NextResponse.redirect(new URL('/login', req.url));
}

// Not: admin kontrolü artık admin sayfasının içinde yapılır
// middleware sadece oturum olup olmadığını kontrol eder
}

return NextResponse.next();
}

export const config = {
matcher: ['/admin/:path*'],
};