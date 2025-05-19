import { FormState, SignupFormSchema } from '@/definitions/users';
import { authClient } from '@/lib/auth-client';
import { requestService } from '@/services/httpClientConfig';

import { redirect } from 'next/navigation';

export const getUsersAsync = async () => {
  return await requestService.get('api/users');
};

export const createUserAsync = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await authClient.signUp.email(
    {
      ...validatedFields.data,
      name: 'Oleh',
    },
    {
      onSuccess: (ctx) => {
        redirect('/login');
      },
    },
  );
};

export const loginAsync = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const resp = await authClient.signIn.email({
    ...validatedFields.data,
    callbackURL: '/dashboard',
  });
  console.log('resp', resp);
};
