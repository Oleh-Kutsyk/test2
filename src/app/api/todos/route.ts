import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const body = await req.json();
  const user = session?.user;

  await prisma.todo.create({
    data: {
      userId: user?.id,
      title: body.title,
    },
  });
  return Response.json({});
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const body = await req.json();
  const user = session?.user;

  await prisma.todo.delete({ where: { id: req.id } });
  return Response.json({});
}
