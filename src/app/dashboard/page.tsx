'use server';

import { getTodosByUserId } from '@/dbActions/todos';
import { auth } from '@/lib/auth';
import { CounterStoreProvider } from '@/providers/storeProvider';

import { headers } from 'next/headers';

import { Dashboard } from './dashboard';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const todos = await getTodosByUserId(session?.user.id);

  return (
    <CounterStoreProvider preloadedState={{ list: todos }}>
      <Dashboard />
    </CounterStoreProvider>
  );
}
