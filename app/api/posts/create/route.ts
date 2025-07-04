import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const token = cookies().get('session-token')?.value;
  const userId = parseInt(token || '0');

  if (!title || !content || !userId) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });

  return NextResponse.json({ message: 'Başarılı', post });
}
