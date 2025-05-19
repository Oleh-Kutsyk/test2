'use client';

import { authClient } from '@/lib/auth-client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
  const router = useRouter();
  return (
    <div>
      <Link
        className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-900 hover:text-white"
        href={'/dashboard/create'}
      >
        Create Todo
      </Link>
      <button
        type="button"
        className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={async () => {
          await authClient.signOut();
          router.push('/login');
        }}
      >
        Log out
      </button>
    </div>
  );
};
