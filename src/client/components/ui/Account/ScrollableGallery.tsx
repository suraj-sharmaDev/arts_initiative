import { Card } from "@/components/ui";
import { useState } from "react";
import { Stack, Carousel } from "react-daisyui";
import CreateGalleryModal from "./CreateGalleryModal";

type Props = {
  galleryItems: any;
  heading: string;
  userId: string;
};

const ScrollableGallery = ({ galleryItems, heading, userId }: Props) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
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
                  <div className="h-[15rem] w-[13rem] bg-primary hover:animate-pulse">
                    <Stack>
                      {gD.artworks.map((iD: any, jdx: number) => (
                        <img
                          src={iD.src}
                          key={gD.title + jdx}
                          className={`h-full w-full`}
                        />
                      ))}
                    </Stack>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Card.Body>
        </Card>
      )}
      <CreateGalleryModal
        isVisible={showCreateModal}
        toggleVisible={toggleCreateModal}
        userId={userId}
      />
    </>
  );
};

export default ScrollableGallery;
