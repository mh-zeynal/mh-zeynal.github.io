import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export function BaseLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="grow p-2">
        <Outlet />
      </main>
      <footer>
        <p>Footer Content</p>
      </footer>
    </>
  );
}
