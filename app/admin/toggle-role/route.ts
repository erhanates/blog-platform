import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get('id'));

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  const newRole = user.role === 'admin' ? 'user' : 'admin';

  await prisma.user.update({
    where: { id },
    data: { role: newRole },
  });

  return NextResponse.redirect('/admin');
}
