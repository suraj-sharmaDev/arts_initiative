import { Error, Loading, MultiCarousel } from "@/components/ui";
import useSponsoredArt from "@/hooks/useSponsoredArt";
import { FireIcon, UserCircleIcon } from "@heroicons/react/24/solid";

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
      <MultiCarousel>
        {artworks.map((artwork: any, idx) => (
          <div
            className="w-full place-content-center space-y-2 rounded rounded border-[0.1rem] border-white p-3 text-right md:w-5/6"
            key={idx}
          >
            <div className="flex w-full place-content-center rounded-full">
              <UserCircleIcon className="h-12 w-12" />
            </div>
            <img
              src={artwork.artworkImage}
              className="h-[12rem] w-full rounded lg:h-60"
            />
            <div className="flex items-center justify-between">
              <span>Rs. {artwork.artworkPrice}</span>
              <span className="text-sm"> - {artwork.artworkName}</span>
            </div>
          </div>
        ))}
      </MultiCarousel>
    </div>
  );
}
