import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;
  const userId = parseInt(token || '0');
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });

  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="p-10 text-red-500">Bu sayfa sadece admin kullanıcılar içindir.</div>;
  }

  const allUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Paneli - Kullanıcı Yönetimi</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Ad</th>
            <th className="p-2 border">E-posta</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border flex gap-2">
                <form action={`/api/admin/delete-user`} method="POST">
                  <input type="hidden" name="id" value={user.id} />
                  <button className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Sil
                  </button>
                </form>
                <form action={`/api/admin/toggle-role`} method="POST">
                  <input type="hidden" name="id" value={user.id} />
                  <button className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
                    Rolü Değiştir
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
