// src/stores/counter-store.ts
import { requestService } from '@/services/httpClientConfig';
import { createStore } from 'zustand/vanilla';

export type TodosState = {
  list: any[];
};

export type TodosActions = {
  getTodosAsync: () => Promise<void>;
};

export type TodosStore = TodosState & TodosActions;

export const initTodosStore = (): TodosState => {
  return { list: [] };
};

export const defaultInitState: TodosState = {
  list: [],
};

export const createTodoStore = (initState: TodosState = defaultInitState) => {
  return createStore<TodosStore>()((set) => ({
    ...initState,
    getTodosAsync: async () => {
      const res = await requestService.get('/api/todos');
      set({ list: res.data });
      console.log(initState);
    },
  }));
};
