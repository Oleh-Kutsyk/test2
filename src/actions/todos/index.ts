import { FormState } from '@/definitions/users';
import { requestService } from '@/services/httpClientConfig';

export const createTodo = async (state: FormState, formData: FormData) => {
  const title = formData.get('title');

  if (!title) {
    return state;
  }

  await requestService.post('api/todos', { title });
  return state;
};
