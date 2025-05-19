'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

interface Props {
  redirectUrl: string;
  title: string;
}

export const MainMenuLink: React.FC<Props> = ({ redirectUrl, title }) => {
  const pathname = usePathname();
  const isActive = pathname === redirectUrl;

  return (
    <a
      href={redirectUrl}
      aria-current={isActive ? 'page' : undefined}
      className={
        isActive
          ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
          : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
      }
    >
      {title}
    </a>
  );
};
