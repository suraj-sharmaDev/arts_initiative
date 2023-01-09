import React from "react";
import { Sidebar, Navbar, Error, Loading, BaseNavbar } from "@/components/ui";

export default function AccountLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      {/* Mobile screen */}
      <div className="show md:hidden">
        <Navbar pageProps={children?.props} />
      </div>
      {/* Desktop Screen */}
      <div className="hidden md:block">
        <BaseNavbar pageProps={children?.props} />
      </div>
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
    </>
  );
}
