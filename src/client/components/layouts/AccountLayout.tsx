import React from "react";

import { Sidebar, Navbar, Error, Loading } from "@/components/ui";
import { BottomNavigator } from "../ui/Account";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex overflow-hidden pt-16">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto lg:ml-64">
          <main>
            <div className="flex h-screen w-full justify-center">
              <div className="w-full px-6 py-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
      <BottomNavigator />
    </>
  );
}
