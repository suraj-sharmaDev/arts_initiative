import Link from "next/link";

export default function Navbar() {
  const sidebarToggler = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("hidden");
  };

  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:py-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              aria-expanded="true"
              aria-controls="sidebar"
              className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden"
              onClick={sidebarToggler}
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link
              href="/account/dashboard"
              className="flex items-center text-xl font-bold lg:ml-2.5"
            >
              <span className="self-center whitespace-nowrap text-primary">
                Arts Initiative
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
