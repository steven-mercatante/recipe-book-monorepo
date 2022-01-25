import { Routes } from "../constants/routes";
import Link from "next/link";
import NavItem, { Variant } from "./NavItem";
import UserAvatar from "./UserAvatar";
import { INavItem } from "../types/nav";
import { UserProfile } from "@auth0/nextjs-auth0";

interface Props {
  navigation: INavItem[];
  user?: UserProfile;
}

export default function DesktopSidebar({ navigation, user }: Props) {
  if (!user) return null;

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <strong>
                <Link href={Routes.Home}>Merc Meals</Link>
              </strong>
            </div>
            <nav className="mt-5 flex-1" aria-label="DesktopSidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavItem
                    item={item}
                    variant={Variant.Desktop}
                    key={item.name}
                  />
                ))}
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <UserAvatar picture={user.picture} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    <Link href={Routes.LogOut}>Log out</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
