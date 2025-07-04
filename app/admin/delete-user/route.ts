import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get('id'));

  await prisma.user.delete({ where: { id } });

  return NextResponse.redirect('/admin');
}
