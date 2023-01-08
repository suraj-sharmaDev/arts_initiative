import { Error, Loading, MultiCarousel } from "@/components/ui";
import useArtworks from "@/hooks/useArtworks";
import { FireIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Props {
  onClickCartBtn: () => void;
}

export default function Creative({ onClickCartBtn }: Props) {
  const { isError, isLoading, artworks } = useArtworks();
  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  if (artworks == null) return null;
  return (
    <div
      className="w-full rounded py-6 pb-10 text-primary md:p-6"
      id="creative"
    >
      <div className="mb-5 flex items-center">
        <FireIcon className="h-8 w-8" />
        <h1 className="text-2xl font-semibold">Creative</h1>
      </div>
      <p className="mb-4 font-medium">
        Selected list of popular creative artworks
      </p>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-10 lg:grid-cols-5">
        {artworks.map((artwork: any, idx) => (
          <Link
            className="cursor-pointer place-content-center space-y-2 rounded bg-white shadow-md hover:shadow-xl"
            key={artwork._id}
            href={"/artwork/" + artwork._id}
          >
            <Image
              src={"/api/getfile/" + artwork.artworkImage}
              width={300}
              height={300}
              className="h-[12rem] w-full rounded md:h-48 lg:h-60"
              alt={artwork.artworkImage}
            />
            <div className="px-1 text-gray-500">
              <p className="truncate text-sm md:text-clip">
                {artwork.artworkName}
              </p>
              <p className="text-md font-bold text-primary">
                Rs. {artwork.artworkPrice}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
