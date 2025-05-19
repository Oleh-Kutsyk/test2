'use client';

import { TodoItem } from '@/components/todoItem';
import { useCounterStore } from '@/providers/storeProvider';

export function Dashboard() {
  const { list } = useCounterStore((state) => state);

  return (
    <div className="max-w-full">
      <ul>
        {list.map((item) => (
          <TodoItem key={item.id} title={item.title} />
        ))}
      </ul>
    </div>
  );
}
