import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
const token = cookies().get('session-token')?.value;
const id = parseInt(token || '0');

const user = await prisma.user.findUnique({
where: { id },
select: { id: true, name: true, email: true, role: true },
});

if (!user) {
return NextResponse.json({ error: 'Giriş yapılmamış.' }, { status: 401 });
}

return NextResponse.json({ user });
}