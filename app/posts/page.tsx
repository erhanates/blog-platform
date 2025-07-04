import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Tüm Yazılar</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Yazar: {post.author.name} – {new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
