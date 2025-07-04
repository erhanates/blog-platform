'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    if (cookies.includes('session-token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Bu platformda kullanıcılar yazılar paylaşabilir, diğer kullanıcılarla mesajlaşabilir ve içerikleri takip edebilir.
      </p>

      {isLoggedIn ? (
        <div className="flex gap-4">
          <Link href="/profile" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profilim</Link>
          <Link href="/posts" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Yazılar</Link>
          <form method="POST" action="/api/logout">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Çıkış Yap</button>
          </form>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Giriş Yap</Link>
          <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Kayıt Ol</Link>
        </div>
      )}
    </div>
  );
}
