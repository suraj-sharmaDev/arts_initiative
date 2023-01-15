import { Error, Loading } from "@/components/ui";
import useSponsoredArt from "@/hooks/useSponsoredArt";
import { CheckBadgeIcon, FireIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const data = {
  artistName: "John Doe",
  pictureName: "Morning rise",
  artistImage: "string",
  pictureDiscription: "string",
  artistLink: "string",
  pictureLink: "string",
};

interface Props {
  onClickCartBtn: () => void;
}

export default function Features({ onClickCartBtn }: Props) {
  const { isError, isLoading, artworks } = useSponsoredArt();
  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  if (artworks == null) return null;

  return (
    <div
      className="w-full rounded border border-primary bg-primary p-6 pb-10 text-white"
      id="features"
    >
      <div className="mb-5 flex items-center">
        <FireIcon className="h-8 w-8" />
        <h1 className="text-2xl font-semibold">Featured</h1>
      </div>
      <p className="mb-4 font-medium">Weekly featured arts</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {artworks.map((artwork: any, idx) => (
          <Link
            className="relative rounded border-[0.1rem] border-white text-right shadow-md hover:shadow-xl"
            key={idx}
            href={"/artwork/" + artwork._id}
          >
            <CheckBadgeIcon className="absolute h-9 w-9 text-white" />
            <div className="place-content-center space-y-2">
              <Image
                width={500}
                height={500}
                src={artwork.artworkImage}
                className="h-[10rem] w-full rounded md:h-48 lg:h-60"
                alt={artwork.artworkName}
              />
              <div className="flex items-center justify-between p-1 text-sm">
                <span>Rs. {artwork.artworkPrice}</span>
                <span className="truncate"> - {artwork.artworkName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
