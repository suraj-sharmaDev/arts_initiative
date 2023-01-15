import {
  Bars3Icon,
  ClipboardIcon,
  HeartIcon,
  PowerIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Dropdown from "../Dropdown";
import Searchbar from "./Searchbar";
import CartButton from "./CartButton";

interface Props {
  pageProps?: any;
}
export default function BaseNavbar({ pageProps }: Props) {
  const session = useSession();
  const router = useRouter();
  const [isCollapsed, setCollapsed] = useState(true);
  const isUserLoggedIn =
    pageProps?.user != null || session.status == "authenticated";
  const navRef = useRef(null);
  useOnClickOutside(navRef, () => setCollapsed(true));

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  const navigateToPath = (path = "/") => {
    router.push(path);
  };

  const LoggedInDropDownUser = [
    {
      title: "My Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
      onClick: () => navigateToPath("/account"),
    },
    {
      title: "Orders",
      icon: <ClipboardIcon className="h-5 w-5" />,
      onClick: () => navigateToPath("/account/orders"),
    },
    {
      title: "Favourites",
      icon: <HeartIcon className="h-5 w-5" />,
      onClick: () => navigateToPath("/account/favourites"),
    },
    {
      title: "Logout",
      icon: <PowerIcon className="h-5 w-5" />,
      onClick: () => signOut(),
    },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-[120] w-full items-center bg-primary py-4 px-8 text-white shadow-md md:flex md:justify-between lg:px-10 lg:py-5"
    >
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
        {isCollapsed ? <Bars3Icon /> : <XMarkIcon />}
      </button>

      {/* Collapsible Nav Items */}
      <ul
        className={`absolute left-0 z-[100] flex flex-col gap-6 bg-primary py-12 pl-6 pr-20 transition-all duration-500 ease-in md:static md:z-auto md:flex-row md:items-center md:gap-5 md:p-0 ${
          isCollapsed ? "left-[-300px]" : "left-0"
        }`}
      >
        <li className="hidden md:block">
          {isUserLoggedIn == true ? (
            <div>
              <Dropdown
                title={
                  (pageProps?.user?.name || session.data?.user?.name)?.split(
                    " "
                  )[0]
                }
                list={LoggedInDropDownUser}
              />
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="rounded bg-white px-5 py-2 text-primary"
            >
              Login
            </Link>
          )}
        </li>
        <li>
          <button className="text-white md:px-5 md:py-1">
            Become a seller
          </button>
        </li>
        <li>
          <CartButton />
        </li>
        {isUserLoggedIn ? (
          <>
            {LoggedInDropDownUser.map((item, idx) => (
              <li
                className="flex cursor-pointer items-center gap-2 md:hidden"
                onClick={item.onClick}
                key={idx}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
            <li className="hidden md:block">
              <Link className="flex" href="/account">
                <UserIcon className="mr-2 h-6 w-6" />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/auth/login"
              className="block rounded bg-white px-5 py-2 text-primary md:hidden"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
