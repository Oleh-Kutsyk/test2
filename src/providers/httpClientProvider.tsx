'use client';

import { httpClientConfig } from '@/services/httpClientConfig';

import React, { useEffect } from 'react';

export function HttpClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    httpClientConfig.initialize({
      getAccessToken: () => localStorage.getItem('accessToken') || '',
      getTokenType: () => 'Bearer',
      refreshToken: async () => {
        const res = await fetch('/api/auth/refresh'); // or your logic
        return res.ok ? await res.json() : undefined;
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      },
    });
  }, []);

  return <>{children}</>;
}
