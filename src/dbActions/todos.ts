import prisma from '@/lib/prisma';

export async function getTodosByUserId(userId?: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { todos: { select: { title: true, id: true } } },
  });
  return user?.todos ?? [];
}
