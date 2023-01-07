import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "react-daisyui";

export default function Searchbar() {
  return (
    <div className="relative flex h-10 w-4/6 items-center bg-white pr-2">
      <Input
        className="m-0 h-full w-full rounded-none border-none bg-transparent p-4 text-sm"
        placeholder="Serch for paintings, categories.."
      />
      <button>
        <MagnifyingGlassIcon className="top-2 right-0 h-7 w-7 text-gray-500" />
      </button>
    </div>
  );
}
