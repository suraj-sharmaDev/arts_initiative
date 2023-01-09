import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  pageProps?: any;
}

export default function Navbar({ pageProps }: Props) {
  const session = useSession();
  console.log(pageProps);
  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:py-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start p-2">
            <Link
              href="/"
              className="text-md flex items-center font-bold text-gray-700 lg:ml-2.5"
            >
              <ArrowLeftIcon className="h-5 w-8" />
              <span className="self-center whitespace-nowrap">
                Hey! {session.data?.user.name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
