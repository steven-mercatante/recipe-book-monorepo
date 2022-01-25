import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { PlusIcon, ViewListIcon } from "@heroicons/react/outline";
import MobileSidebar from "./MobileSidebar";
import { Routes } from "../constants/routes";
import DesktopSidebar from "./DesktopSidebar";
import ContentContainer from "./ContentContainer";
import MobileTopNav from "./MobileTopNav";

const navigation = [
  { name: "Recipes", href: Routes.ViewRecipes, icon: ViewListIcon },
  {
    name: "New Recipe",
    href: Routes.NewRecipe,
    icon: PlusIcon,
  },
];

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="h-full flex">
      <MobileSidebar
        navigation={navigation}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        user={user}
      />
      <DesktopSidebar navigation={navigation} user={user} />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <MobileTopNav setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <ContentContainer>{children}</ContentContainer>
          </main>
        </div>
      </div>
    </div>
  );
}
