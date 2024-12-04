'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function NavbarComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;  
  }

  return (
    <nav className="bg-[#ff5200] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-white font-bold text-lg">MyApp</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse mt-4 md:mt-0">
            {session ? (
              <li>
                <span className="block p-4 text-white md:p-0">{session.email}</span>
              </li>
            ) : (
              <li>
                <Link href="/user/auth/sign-in" className="block p-4 text-white md:p-0">
                  Sign In
                </Link>
              </li>
            )}
            {session && (
              <>
                <li>
                  <button onClick={() => signOut()} className="block p-4 text-white md:p-0">
                    Sign Out
                  </button>
                </li>
                <li>
                  <Link href="/user/cart" className='text-white'>Cart</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
