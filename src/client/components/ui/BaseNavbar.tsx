import Link from "next/link";

const NavItems = [
  {
    title: "Features",
    to: "/#features",
  },
  {
    title: "Creative",
    to: "/#creative",
  },
  {
    title: "Popular",
    to: "/#popular",
  },
];

export default function BaseNavbar() {
  const toggleNavbar = () => {
    const collapsableBaseNavbar = document.getElementById(
      "collapsableBaseNavbar"
    );
    if (collapsableBaseNavbar?.classList.contains("block")) {
      collapsableBaseNavbar?.classList.remove("block");
      collapsableBaseNavbar?.classList.add("hidden");
    } else {
      collapsableBaseNavbar?.classList.remove("hidden");
      collapsableBaseNavbar?.classList.add("block");
    }
  };
  return (
    <nav className="flex flex-wrap items-center justify-between bg-white p-5 lg:px-10">
      <div className="mr-6 flex flex-shrink-0 items-center">
        <Link href={"/"}>
          <span className="text-xl font-bold text-primary">
            Arts Initiative
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-white px-3 py-2 hover:border-secondary hover:text-secondary"
          onClick={toggleNavbar}
        >
          <svg
            className="h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className="hidden w-full flex-grow lg:flex lg:w-auto lg:items-center"
        id="collapsableBaseNavbar"
      >
        <div className="text-md lg:flex lg:flex-grow lg:items-end lg:justify-end">
          {NavItems.map((n, idx) => {
            return (
              <Link
                href={n.to}
                className="mr-4 mt-4 block lg:mx-10 lg:mt-0 lg:inline-block"
                key={idx.toString()}
              >
                {n.title}
              </Link>
            );
          })}
        </div>
        <div>
          <a
            href="#"
            className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}
