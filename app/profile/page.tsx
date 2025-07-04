'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
const [user, setUser] = useState<any>(null);
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');

useEffect(() => {
fetch('/api/profile')
.then((res) => res.json())
.then((data) => {
setUser(data.user);
setName(data.user?.name || '');
});
}, []);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

const res = await fetch('/api/profile/update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, password }),
});

if (res.ok) {
  setMessage('Bilgiler güncellendi!');
  setPassword('');
} else {
  setMessage('Güncelleme başarısız.');
}
};

if (!user) {
return <p className="p-10 text-red-500">Lütfen giriş yapınız.</p>;
}

return (
<div className="p-10 max-w-md mx-auto">
<h1 className="text-2xl font-bold mb-4">Profilim</h1>
{message && <p className="mb-4 text-green-600">{message}</p>}
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label>Adınız</label>
<input
type="text"
className="w-full border p-2"
value={name}
onChange={(e) => setName(e.target.value)}
/>
</div>
<div>
<label>Yeni Şifre (boş bırakılırsa değişmez)</label>
<input
type="password"
className="w-full border p-2"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<button className="bg-blue-500 text-white px-4 py-2 rounded">Güncelle</button>
</form>
</div>
);
}