'use client';

import { sidebarLinks } from '@//constants';
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../ui/button';
import { SignedOut } from '@clerk/clerk-react';
import Link from 'next/link';
import { NestedSidebarLink } from '@/types';

export const LeftSideBar = () => {
  const pathName = usePathname();

  const isLinkActive = (
    itemRoute: string,
    nestedLinks?: NestedSidebarLink[]
  ): boolean => {
    if (pathName === itemRoute || pathName.startsWith(itemRoute + '/')) {
      return true;
    }
    if (nestedLinks) {
      return nestedLinks.some((nestedLink) =>
        pathName.includes(nestedLink.route)
      );
    }
    return false;
  };

  return (
    <section
      className="
        background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen
        flex-col justify-between overflow-y-auto border-r p-6 pt-24 shadow-light-300
        dark:shadow-none max-sm:hidden lg:w-[230px]"
    >
      <div className="flex flex-1 flex-col gap-1">
        {sidebarLinks.map((item) => {
          const isActive = isLinkActive(item.route, item.nestedLinks);

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-3`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'} `}
              />
              <p
                className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Login</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign-up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};
