import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
const { name, password } = await req.json();
const token = cookies().get('session-token')?.value;
const id = parseInt(token || '0');

if (!id) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });

const updateData: any = { name };

if (password && password.length >= 3) {
const hashed = await bcrypt.hash(password, 10);
updateData.password = hashed;
}

await prisma.user.update({
where: { id },
data: updateData,
});

return NextResponse.json({ message: 'Güncellendi' });
}