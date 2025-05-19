'use client';

import { type TodosState, type TodosStore, createTodoStore, initTodosStore } from '@/stores/todos';
import { useStore } from 'zustand';

import { type ReactNode, createContext, useContext, useRef } from 'react';

export type CounterStoreApi = ReturnType<typeof createTodoStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
  preloadedState?: TodosState;
}

export const CounterStoreProvider = ({ children, preloadedState }: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTodoStore(preloadedState) || createTodoStore(initTodosStore());
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>
  );
};

export const useCounterStore = <T,>(selector: (store: TodosStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
