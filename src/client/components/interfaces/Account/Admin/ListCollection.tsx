import { Error, Loading } from "@/components/ui";
import { UploadPictureModal } from "@/components/ui/Account/Client";
import useGallery from "@/hooks/useGallery";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { Button, Stack } from "react-daisyui";

export default function ListArtist() {
  const { isLoading, isError, userGallery } = useGallery(undefined);
  const [isVisible, setVisible] = useState(false);
  const currentGalleryId = useRef<string | null>(null);

  const toggleVisible = (galleryId: string | undefined) => {
    if (isVisible) {
      currentGalleryId.current = null;
    } else if (galleryId) {
      currentGalleryId.current = galleryId;
    }
    setVisible(!isVisible);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="mt-5 w-full">
      <ul className="flex flex-wrap gap-y-5 md:gap-x-1 lg:gap-x-10">
        {userGallery.map((a: any) => {
          return (
            <li
              key={a._id}
              className="w-full rounded bg-neutral p-5 text-center text-white md:w-1/4 lg:w-1/6"
            >
              <p>{a.galleryName}</p>
              {a.artworks.length == 0 ? (
                <div className="flex h-[10rem] w-full flex-col bg-accent p-5">
                  No Artworks Uploaded
                  <Button
                    color="secondary"
                    className="mt-8"
                    onClick={() => toggleVisible(a._id)}
                  >
                    Upload
                  </Button>
                </div>
              ) : (
                <div className="relative w-full rounded">
                  <div className="absolute z-10 flex h-full w-full items-center justify-center bg-transparent">
                    <PlusCircleIcon
                      className="h-20 w-20 text-transparent hover:text-primary"
                      onClick={() => toggleVisible(a._id)}
                    />
                  </div>
                  <Stack>
                    {a.artworks.map((art: any) => (
                      <img
                        src={"/api/getfile/" + art.artworkImage}
                        key={art._id}
                        className={`h-[10rem] w-full rounded`}
                      />
                    ))}
                  </Stack>
                </div>
              )}
              <p className="text-sm">{a.galleryDescription}</p>
            </li>
          );
        })}
      </ul>
      <UploadPictureModal
        isVisible={isVisible}
        toggleVisible={() => toggleVisible(undefined)}
        userId={undefined}
        galleryId={currentGalleryId.current}
      />
    </div>
  );
}
