import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export function BaseLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
}
