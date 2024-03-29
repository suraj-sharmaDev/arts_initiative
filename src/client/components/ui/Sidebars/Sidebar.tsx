import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import NavItem from "../NavItem";

export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <aside
        className="transition-width lg:show fixed top-0 left-0 z-20 flex hidden h-full w-64 flex-shrink-0 flex-col pt-20 duration-75 lg:flex"
        aria-label="Sidebar"
        id="sidebar"
      >
        <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0">
          <div className="flex flex-1 flex-col overflow-y-auto pt-7 pb-4 lg:pt-5">
            <div className="flex-1 space-y-1 divide-y bg-white px-3">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavItem
                    href="/account/settings"
                    text="Settings"
                    icon={HomeIcon}
                    active={router.pathname === "/account/settings"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/account/favourites"
                    text="Favourites"
                    icon={MagnifyingGlassIcon}
                    active={router.pathname === "/account/favourites"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/account/orders"
                    text="Orders"
                    icon={ShoppingBagIcon}
                    active={router.pathname === "/account/orders"}
                  />
                </li>
              </ul>
              <div className="space-y-2 pt-2">
                <NavItem
                  href="#"
                  text="Logout"
                  icon={ArrowLeftOnRectangleIcon}
                  onClick={() => signOut()}
                  active={false}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div
        className="fixed inset-0 z-10 hidden bg-gray-900 opacity-50"
        id="sidebarBackdrop"
      />
    </>
  );
}
