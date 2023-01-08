import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { getSingleArtworkDetail } from "@/models/artwork";
import { inferSSRProps } from "@/lib/inferSSRProps";
import type { NextPageWithLayout } from "@/types/index";
import { BaseLayout } from "@/components/layouts";
import useUserCart from "@/hooks/useUserCart";

const Artwork: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  artwork,
}) => {
  const router = useRouter();
  const {
    _id,
    artworkName,
    artworkDescription,
    artworkPrice,
    galleryDetails,
    artistDetails,
  } = artwork;
  const { galleryName, galleryDescription } = galleryDetails;
  const { name } = artistDetails;
  const { isLoading, isError, userCart, mutate } = useUserCart();
  let isItemAddedToCart = false;

  if (!isLoading && !isError) {
    isItemAddedToCart = userCart.some((el: any) => el.artworkId == _id);
  }

  const onClickCartBtn = async () => {
    if (isItemAddedToCart) {
      router.push("/cart");
    } else {
      await axios.post("/api/cart", {
        artworkId: _id,
        price: artworkPrice,
      });
      mutate();
    }
  };

  return (
    <div className="relative w-full space-y-6 py-3">
      <div className="static w-full md:fixed md:top-28 md:left-6 md:w-5/12">
        <Image
          src={"/api/getfile/" + artwork?.artworkImage}
          width="1024"
          height="1024"
          className="h-[20rem] w-full rounded md:h-[32rem]"
          alt={artworkName}
        />
        <button
          className={`btn-${
            isItemAddedToCart ? "success" : "primary"
          } btn fixed bottom-2 mt-4 w-11/12 rounded p-3 text-center text-white shadow-md md:static md:w-full`}
          onClick={onClickCartBtn}
        >
          <span>{isItemAddedToCart ? "Open Cart" : "Add to Cart"}</span>
        </button>
      </div>
      <div className="static w-full space-y-2 md:absolute md:top-0 md:right-0 md:w-1/2">
        <p className="text-3xl font-bold">{artworkName}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded bg-green-500 px-2 py-1 text-white">
            <span className="text-sm">4</span>
            <StarIcon className="h-3 w-3" />
          </div>
          <div>
            <span className="text-sm text-gray-400">
              122 ratings and 12 reviews
            </span>
          </div>
        </div>
        <p>{artworkDescription}</p>
        <p className="text-xl text-primary">Rs. {artworkPrice}</p>
        <div className="divider">
          <span className="text-md">By - {name}</span>
        </div>
        <span className="font-bold">From Gallery</span>
        <p>{galleryName}</p>
        <p>{galleryDescription}</p>
      </div>
    </div>
  );
};

Artwork.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query;
  const artworkId = query?.artworkId?.[0];
  if (!artworkId) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const artwork: any = await getSingleArtworkDetail({
    _id: new ObjectId(artworkId),
  });
  return {
    props: {
      artwork,
    },
  };
};

export default Artwork;
