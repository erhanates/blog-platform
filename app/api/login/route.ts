import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Şifre yanlış.' }, { status: 401 });
  }

  // Basit bir token olarak kullanıcı ID'sini yazıyoruz (güvenli değil ama basit sistemler için yeterli)
  const token = `${user.id}`;

  cookies().set('session-token', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  return NextResponse.json({ message: 'Giriş başarılı', user });
}
