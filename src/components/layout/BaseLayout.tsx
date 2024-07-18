import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar/Navbar';
import { Footer } from './Footer';

export function BaseLayout() {
  return (
    <div className={'flex flex-col h-full overflow-y-auto'}>
      <header className={'fixed w-full z-50'}>
        <Navbar />
      </header>
      <main className="mt-14 p-2 min-h-screen *:h-full">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
