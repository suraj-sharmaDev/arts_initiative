import {
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const Menus = [
  { title: "Home", icon: HomeIcon, href: "/account" },
  { title: "Explore", icon: MagnifyingGlassIcon, href: "/account/explore" },
  { title: "Cart", icon: ShoppingBagIcon, href: "/account/cart" },
  { title: "Profile", icon: UserIcon, href: "/account/profile" },
];

export default function BottomNavigator() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 flex h-16 w-full rounded-t-xl bg-primary px-10 lg:hidden">
      <ul className="text-md flex w-full items-center justify-between font-bold text-white">
        {Menus.map((m, idx) => {
          const Icon = m.icon;
          const isActive = router.pathname == m.href;
          return (
            <li key={idx.toString()}>
              <Link href={m.href} className="flex flex-col items-center">
                <span>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="cursor-pointer text-center">{m.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
