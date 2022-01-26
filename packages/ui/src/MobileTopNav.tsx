import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";

interface Props {
  routes: any; // TODO: real type
  setSidebarOpen: (b: boolean) => void;
}

export function MobileTopNav({ setSidebarOpen, routes }: Props) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
        <div>
          <Link href={routes.Home}>Merc Meals</Link>
        </div>
        <div>
          <button
            type="button"
            className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
