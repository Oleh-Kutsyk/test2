import { MainMenuLink } from '@/components/mainMenuLinks';
import { SignOutButton } from '@/components/signOutButton';

import React from 'react';

import Link from 'next/link';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-1">
      <nav className="bg-gray-800">
        <div className="max-w-full sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  <MainMenuLink redirectUrl={'/dashboard'} title={'Dashboard'} />
                  <MainMenuLink redirectUrl={'/dashboard/completed'} title={'Completed'} />
                  <MainMenuLink redirectUrl={'/dashboard/favourite'} title={'Favourite'} />
                </div>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </nav>
      <header className="bg-white shadow-sm">
        <div className=" max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
