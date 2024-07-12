import React from 'react';
import { Outlet } from 'react-router-dom';

export function BaseLayout() {
  return (
    <div className={'flex flex-col h-full'}>
      <header>
        {/* <Navbar />*/}
      </header>
      <main className="grow overflow-y-auto p-2">
        <Outlet />
      </main>
      <footer>
        {/* <Footer />*/}
      </footer>
    </div>
  );
}
