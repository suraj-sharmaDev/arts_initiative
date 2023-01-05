import { Card } from "@/components/ui";
import { useRef, useState } from "react";
import { Stack, Carousel } from "react-daisyui";
import CreateGalleryModal from "./CreateGalleryModal";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import UploadPictureModal from "./UploadPictureModal";

type Props = {
  galleryItems: any;
  heading: string;
  userId: string;
};

const ScrollableGallery = ({ galleryItems, heading, userId }: Props) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const currentFocusedGalleryId = useRef<string | null | undefined>(null);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleUploadModal = (galleryId?: string) => {
    currentFocusedGalleryId.current = showUploadModal ? null : galleryId;
    setShowUploadModal(!showUploadModal);
  };

  return (
    <>
      {!galleryItems || galleryItems.length == 0 ? (
        <div className="items-left flex flex-col rounded bg-primary p-4 text-white">
          <span className="text-lg">If you are an artist, partner with us</span>
          <button
            className="btn-secondary btn mt-4 w-[10rem] text-sm text-white"
            onClick={toggleCreateModal}
          >
            <span>Join as Artist</span>
          </button>
        </div>
      ) : (
        <Card heading={heading}>
          <Card.Body>
            <Carousel className="gap-4">
              {galleryItems.map((gD: any, idx: number) => (
                <Carousel.Item
                  key={idx}
                  className="flex cursor-pointer flex-col items-center p-3"
                >
                  <span>{gD.galleryName}</span>
                  <div className="h-[15rem] w-[13rem] rounded bg-primary hover:animate-pulse">
                    {gD.artworks.length == 0 ? (
                      <button
                        onClick={() => toggleUploadModal(gD._id)}
                        className="flex h-full w-full flex-col items-center justify-center text-white"
                      >
                        <ArrowUpCircleIcon className="mb-4 h-20 w-20" />
                        <span>Upload pictures in gallery!</span>
                      </button>
                    ) : (
                      <Stack>
                        {gD.artworks.map((iD: any, jdx: number) => (
                          <img
                            src={"/api/getfile/" + iD.artworkImage}
                            key={gD.title + jdx}
                            className={`h-full w-full`}
                          />
                        ))}
                      </Stack>
                    )}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Card.Body>
          <Card.Footer>
            <button
              className="btn-secondary btn text-white"
              onClick={toggleCreateModal}
            >
              Create new Gallery
            </button>
          </Card.Footer>
        </Card>
      )}
      <CreateGalleryModal
        isVisible={showCreateModal}
        toggleVisible={toggleCreateModal}
        userId={userId}
      />
      <UploadPictureModal
        isVisible={showUploadModal}
        toggleVisible={toggleUploadModal}
        userId={userId}
        galleryId={currentFocusedGalleryId.current}
      />
    </>
  );
};

export default ScrollableGallery;
