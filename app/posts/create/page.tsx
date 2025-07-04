'use client';
import { useState } from 'react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setSuccess(true);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Yeni Yazı Ekle</h1>
      {success && <p className="text-green-600 mb-4">Yazı başarıyla eklendi!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 h-40"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Gönder
        </button>
      </form>
    </div>
  );
}
