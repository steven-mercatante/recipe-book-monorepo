import React, { useState } from "react";
import {ContentContainer} from "./ContentContainer";
import { MobileSidebar} from "./MobileSidebar";
import { useUser } from "@auth0/nextjs-auth0"; // TODO: should this be passed in as a prop?
import { PlusIcon, ViewListIcon } from "@heroicons/react/outline";
import {DesktopSidebar} from "./DesktopSidebar";
import {MobileTopNav} from "./MobileTopNav";

interface Props {
  children: React.ReactNode;
  routes: any // TODO: real type
}

export function Layout({ children, routes }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

    const navigation = [
        { name: "Recipes", href: routes.ViewRecipes, icon: ViewListIcon },
        {
            name: "New Recipe",
            href: routes.NewRecipe,
            icon: PlusIcon,
        },
    ];

  return (
    <div className="h-full flex">
      <MobileSidebar
        navigation={navigation}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        routes={routes}
        user={user}
      />
      <DesktopSidebar navigation={navigation} routes={routes} user={user} />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <MobileTopNav setSidebarOpen={setSidebarOpen} routes={routes}/>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <ContentContainer>{children}</ContentContainer>
          </main>
        </div>
      </div>
    </div>
  );
}
