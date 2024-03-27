import { LeftSideBar } from '@/components/shared/LeftSideBar';
import NavBar from '@/components/shared/navbar/NavBar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative background-light900_dark300">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="max-w-5x1 mx-auto w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
