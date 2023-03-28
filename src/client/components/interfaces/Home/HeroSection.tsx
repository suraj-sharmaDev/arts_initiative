import Image from "next/image";
import Link from "next/link";
import { Error, Loading, MultiCarousel } from "@/components/ui";
import useSponsoredArt from "@/hooks/useSponsoredArt";

export default function HeroSection() {
  const { isError, isLoading, artworks } = useSponsoredArt();
  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  if (artworks == null) return null;

  return (
    <div className="mt-4 flex w-full flex-wrap space-y-3 py-4">
      <div className="flex w-full items-center lg:w-2/4">
        <MultiCarousel isSingleItemCarousel={true}>
          {artworks.map((artwork: any, idx: number) => {
            return (
              <Link href={"/artwork/" + artwork._id} key={idx}>
                <div className="border-1 flex w-full flex-col gap-y-2 border-white p-4 shadow-md hover:shadow-2xl lg:px-10">
                  <p className="text-lg font-bold">{artwork.artworkName}</p>
                  <Image
                    src={artwork.artworkImage}
                    width={600}
                    height={500}
                    className="h-[55vh] w-full"
                    alt={`Image ${idx}`}
                  />
                  <p className="text-lg font-bold text-primary">
                    Rs. {artwork.artworkPrice}
                  </p>
                </div>
              </Link>
            );
          })}
        </MultiCarousel>
      </div>

      <div className="hidden h-[15rem] w-full items-center justify-center lg:flex lg:h-[27rem] lg:w-2/4">
        <Image
          src="/images/logo.png"
          width={350}
          height={350}
          alt="Brand Logo"
          className="h-[200px] w-[200px] lg:h-[350px] lg:w-[350px]"
        />
      </div>
    </div>
  );
}
