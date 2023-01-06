import React from "react";

import { AdminNavbar, AdminSidebar, Error, Loading } from "@/components/ui";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <div className="flex overflow-hidden pt-16">
        <AdminSidebar />
        <div className="relative h-full w-full overflow-y-auto lg:ml-64">
          <main>
            <div className="flex w-full justify-center">
              <div className="w-full px-6 py-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
