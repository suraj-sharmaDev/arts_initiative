import AdminLayout from "@/components/layouts/AdminLayout";
import { Loading, Error, CustomModal } from "@/components/ui";
import { UploadPictureModal } from "@/components/ui/Account/Client";
import useGallery from "@/hooks/useGallery";
import { generateServerSideProps } from "@/lib/auth";
import jsonToFormData from "@/lib/jsonToFormData";
import { ApiResponse } from "@/types/index";
import { NextPageWithLayout } from "@/types/next";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement, useRef, useState } from "react";
import { Button, Toggle } from "react-daisyui";
import toast from "react-hot-toast";

const SingleCollection: NextPageWithLayout = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const { isLoading, isError, userGallery, mutate } = useGallery({
    galleryId: collectionId,
  });
  const [isVisible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const currentSelectedArtId = useRef<string | null>(null);
  const [currentSelectedArtEdit, setSelectedArtEdit] = useState(null);

  const toggleVisible = (artData = null) => {
    if (!isVisible && artData != null) {
      setSelectedArtEdit(artData);
    } else {
      setSelectedArtEdit(null);
    }
    setVisible(!isVisible);
  };

  const toggleDeleteVisible = (artworkId: string | undefined | void) => {
    if (artworkId) currentSelectedArtId.current = artworkId;
    else currentSelectedArtId.current = null;
    setDeleteVisible(!deleteVisible);
  };

  const onClickDeleteArt = async () => {
    const response = await axios.delete(
      `/api/artwork/${currentSelectedArtId.current}`
    );
    const { error, data }: ApiResponse<any> = response.data;
    if (error) {
      toast.error(error.message);
      return;
    }
    mutate();
    toggleDeleteVisible();
  };

  const onSponsorArt = async (artworkId: string, bool: boolean) => {
    const formData = jsonToFormData({ isSponsored: bool });
    await axios({
      url: "/api/artwork" + "/" + artworkId,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    mutate();
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      <h1 className="text-center">Artworks inside Collection</h1>
      <div className="alert mb-4">
        <Button size="md" color="primary" onClick={() => toggleVisible()}>
          <span className="text-sm">Add Artwork</span>
        </Button>
      </div>
      <div className="flex flex-wrap gap-y-5 md:gap-x-1 lg:gap-x-10">
        {userGallery[0].artworks.length == 0 ? (
          <div></div>
        ) : (
          userGallery[0].artworks.map((a: any) => {
            return (
              <div
                key={a._id}
                className="relative w-full rounded bg-primary p-4 text-center text-white md:w-1/4 lg:w-1/6"
              >
                <button
                  className="absolute top-0 left-0"
                  onClick={() => toggleVisible(a)}
                >
                  <PencilSquareIcon className="h-8 w-8" />
                </button>
                <button
                  className="absolute top-0 right-0"
                  onClick={() => toggleDeleteVisible(a._id)}
                >
                  <XCircleIcon className="h-8 w-8" />
                </button>
                <div className="mt-3">
                  <p>{a.artworkName}</p>
                  <p>{a.artworkDescription}</p>
                  <div className="p-4">
                    <img
                      src={"/api/getfile/" + a.artworkImage}
                      className={`h-[13rem] w-full rounded`}
                    />
                  </div>
                  <div>
                    <span>Sponsor this art</span>
                    <Toggle
                      color="primary"
                      checked={a?.isSponsored}
                      onChange={(event) =>
                        onSponsorArt(a._id, event.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <UploadPictureModal
        isVisible={isVisible}
        galleryId={collectionId as string}
        toggleVisible={toggleVisible}
        userId={undefined}
        onUploadSuccess={mutate}
        methodType={currentSelectedArtEdit == null ? "POST" : "PUT"}
        existingArtData={currentSelectedArtEdit}
      />
      <CustomModal
        isVisible={deleteVisible}
        toggleVisible={() => toggleDeleteVisible(undefined)}
        responsive={false}
      >
        <CustomModal.Header>
          <span>Do you want to delete art?</span>
        </CustomModal.Header>
        <CustomModal.Body className="pb-0">
          <div className="flex justify-between">
            <Button className="w-1/3" color="error" onClick={onClickDeleteArt}>
              Yes
            </Button>
            <Button
              className="w-1/3"
              color="secondary"
              onClick={() => toggleDeleteVisible(undefined)}
            >
              No
            </Button>
          </div>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return generateServerSideProps(context);
};

SingleCollection.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default SingleCollection;
