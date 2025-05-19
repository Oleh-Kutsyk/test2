import { useStoreTodos } from '@/stores/todos';
import { create } from 'zustand';
import { combine } from 'zustand/middleware/combine';

export const useStore = create(combine);
