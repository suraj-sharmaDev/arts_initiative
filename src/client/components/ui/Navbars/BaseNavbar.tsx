import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Searchbar from "./Searchbar";

export default function BaseNavbar() {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <nav className="fixed top-0 left-0 z-[120] w-full items-center bg-primary py-4 px-8 text-white shadow-md md:flex md:justify-between lg:px-10 lg:py-5">
      {/* Brand and Searchbar */}
      <div className="flex w-full items-center justify-around md:w-4/6">
        <Link href={"/"}>
          <span className="text-xl lg:text-2xl">Arted</span>
        </Link>
        <Searchbar />
      </div>

      {/* Hamburger Menu */}
      <button
        className="absolute top-5 left-2 h-8 w-8 cursor-pointer md:hidden"
        onClick={toggleCollapsed}
      >
        {!isCollapsed ? <Bars3Icon /> : <XMarkIcon />}
      </button>

      {/* Collapsibel Nav Items */}
      <ul
        className={`absolute left-0 z-[100] flex flex-col gap-6 bg-primary p-8 transition-all duration-500 ease-in md:static md:z-auto md:flex-row md:items-center md:gap-5 md:p-0 ${
          isCollapsed ? "left-0" : "left-[-200px]"
        }`}
      >
        <li>
          <Link
            href="/auth/login"
            className="rounded bg-white px-5 py-2 text-primary"
          >
            Login
          </Link>
        </li>
        <li>
          <button className="text-white md:px-5 md:py-1">
            Become a seller
          </button>
        </li>
        <li className="flex">
          <ShoppingCartIcon className="mr-2 h-6 w-6" />
          <span className="block md:hidden">Cart</span>
        </li>
        <li className="flex">
          <UserIcon className="mr-2 h-6 w-6" />
          <span className="block md:hidden">Profile</span>
        </li>
      </ul>
    </nav>
  );
}
