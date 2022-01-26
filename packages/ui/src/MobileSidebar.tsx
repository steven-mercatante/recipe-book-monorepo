import React, { Fragment } from "react";
import Link from "next/link";
import {UserAvatar} from "./UserAvatar";
import { NavItem, Variant } from "./NavItem";
import type { INavItem } from "./NavItem";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { UserProfile } from "@auth0/nextjs-auth0";

interface Props {
  navigation: INavItem[];
  routes: any; // TODO: real type
  setSidebarOpen: (b: boolean) => void;
  sidebarOpen: boolean;
  user?: UserProfile;
}

export function MobileSidebar({
  navigation,
  routes,
  setSidebarOpen,
  sidebarOpen,
  user,
}: Props) {
  if (!user) return null;

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <strong>Merc Meals</strong>
              </div>
              <nav aria-label="DesktopSidebar" className="mt-5">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <NavItem
                      item={item}
                      handleNavChange={() => setSidebarOpen(false)}
                      variant={Variant.Mobile}
                      key={item.name}
                    />
                  ))}
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <UserAvatar picture={user.picture} />
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      <Link href={routes.LogOut}>Log out</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
