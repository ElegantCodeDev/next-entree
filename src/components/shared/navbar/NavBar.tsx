'use client';

import React from 'react';
import Link from 'next/link';
import { UserButton, SignedIn } from '@clerk/nextjs';
import Theme from './Theme';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const NavBar = () => {
  const pathName = usePathname();

  let activeSidebarLink = sidebarLinks.find(
    (link) => pathName === link.route || pathName.startsWith(link.route + '/')
  );

  if (!activeSidebarLink) {
    sidebarLinks.some((link) => {
      if (link.nestedLinks) {
        const match = link.nestedLinks.some((nestedLink) =>
          pathName.includes(nestedLink.route)
        );
        if (match) {
          activeSidebarLink = link;
          return true;
        }
      }
      return false;
    });
  }

  const nestedLinks = activeSidebarLink?.nestedLinks || [];
  let activeLinkLabel =
    nestedLinks.find((link) => pathName.includes(link.route))?.label ||
    'Select an Option';

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full h-16 gap-5 p-4 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/dashboard/user-metrics" className="flex items-center gap-1 ">
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Zuse<span className="text-primary-500">BMT</span>
        </p>
      </Link>

      {nestedLinks && nestedLinks.length > 0 && (
        <>
          <div className="gap-5 lg:flex hidden">
            {nestedLinks.map((nestedLink) => {
              const isActive = pathName === nestedLink.route;

              return (
                <Link
                  key={nestedLink.route}
                  href={nestedLink.route}
                  className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-2`}
                >
                  <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                    {nestedLink.label}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="lg:hidden flex flex-col items-center justify-center p-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="primary-gradient rounded-lg text-light-900 flex items-center justify-center gap-4 p-2 w-40">
                    {activeLinkLabel}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-2 min-w-[190px] py-2 relative background-light900_dark200 rounded-md shadow">
                    {nestedLinks.map((nestedLink) => {
                      const isActive = pathName === nestedLink.route;

                      return (
                        <Link
                          key={nestedLink.route}
                          href={nestedLink.route}
                          className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-2`}
                        >
                          <p
                            className={`${isActive ? 'base-bold' : 'base-medium'}`}
                          >
                            {nestedLink.label}
                          </p>
                        </Link>
                      );
                    })}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </>
      )}

      <div className="flex-between gap-6 ">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
