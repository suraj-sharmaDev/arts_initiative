import { ReactElement } from "react";
import type { NextPageWithLayout } from "@/types/index";
import { BaseLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSingleArtworkDetail } from "@/models/artwork";
import { ObjectId } from "mongodb";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { StarIcon } from "@heroicons/react/24/solid";

const Artwork: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  artwork,
}) => {
  const router = useRouter();
  const {
    artworkName,
    artworkDescription,
    artworkPrice,
    galleryDetails,
    artistDetails,
  } = artwork;

  const { galleryName, galleryDescription } = galleryDetails;

  const { name } = artistDetails;

  const onClickCartBtn = () => {
    console.log("add data to cart");
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
          className="btn-primary btn fixed bottom-2 mt-4 w-11/12 rounded p-3 text-center text-white shadow-md md:static md:w-full"
          onClick={onClickCartBtn}
        >
          <span>Add to Cart</span>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed
          id semper risus in hendrerit gravida. Velit euismod in pellentesque
          massa placerat duis. Consequat id porta nibh venenatis cras sed felis
          eget velit. Pharetra et ultrices neque ornare. Aliquam etiam erat
          velit scelerisque in. Gravida neque convallis a cras semper auctor
          neque. Feugiat sed lectus vestibulum mattis ullamcorper. Volutpat diam
          ut venenatis tellus. Iaculis urna id volutpat lacus laoreet non. Donec
          massa sapien faucibus et molestie ac feugiat sed. Cras pulvinar mattis
          nunc sed blandit libero volutpat. Id aliquet risus feugiat in ante
          metus dictum at. Euismod lacinia at quis risus sed. Laoreet id donec
          ultrices tincidunt arcu non sodales. Non blandit massa enim nec. Dui
          nunc mattis enim ut. Et odio pellentesque diam volutpat commodo sed
          egestas. In massa tempor nec feugiat nisl pretium. Sed elementum
          tempus egestas sed sed risus. Quisque sagittis purus sit amet.
          Suspendisse interdum consectetur libero id faucibus nisl tincidunt
          eget nullam. Dui sapien eget mi proin sed libero enim sed faucibus.
          Condimentum lacinia quis vel eros donec ac odio tempor orci. Sed sed
          risus pretium quam vulputate dignissim suspendisse. Nibh nisl
          condimentum id venenatis a condimentum vitae sapien. Vivamus at augue
          eget arcu dictum. Posuere lorem ipsum dolor sit amet consectetur
          adipiscing elit. Integer quis auctor elit sed vulputate mi sit amet.
          Suspendisse ultrices gravida dictum fusce ut placerat. Suspendisse
          potenti nullam ac tortor. Scelerisque purus semper eget duis at tellus
          at urna condimentum. Adipiscing commodo elit at imperdiet dui. Sed
          libero enim sed faucibus turpis in eu. Augue eget arcu dictum varius
          duis at. In metus vulputate eu scelerisque felis. Et odio pellentesque
          diam volutpat commodo. Ultricies mi quis hendrerit dolor magna eget
          est lorem ipsum. Sit amet dictum sit amet. Sed viverra tellus in hac
          habitasse platea dictumst vestibulum rhoncus. Maecenas accumsan lacus
          vel facilisis volutpat est. Dictum non consectetur a erat nam at.
          Lectus nulla at volutpat diam ut venenatis tellus in metus. Metus
          aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.
          Aliquet bibendum enim facilisis gravida neque convallis a cras.
          Ultricies mi eget mauris pharetra et. Amet luctus venenatis lectus
          magna fringilla urna porttitor rhoncus dolor. Urna porttitor rhoncus
          dolor purus non enim praesent elementum. In pellentesque massa
          placerat duis ultricies lacus. At risus viverra adipiscing at in
          tellus integer. Sed vulputate mi sit amet mauris commodo quis
          imperdiet massa. Ut tortor pretium viverra suspendisse potenti nullam
          ac tortor. Aliquam sem fringilla ut morbi tincidunt. Amet est placerat
          in egestas. Integer feugiat scelerisque varius morbi enim nunc
          faucibus. Nibh venenatis cras sed felis. Nunc vel risus commodo
          viverra maecenas accumsan. Sed id semper risus in hendrerit gravida
          rutrum quisque. Et tortor consequat id porta. Aliquam faucibus purus
          in massa. Metus vulputate eu scelerisque felis imperdiet. Nunc
          faucibus a pellentesque sit amet porttitor eget dolor. Ut morbi
          tincidunt augue interdum velit. Potenti nullam ac tortor vitae purus.
          In ante metus dictum at tempor commodo. Odio aenean sed adipiscing
          diam donec adipiscing tristique. Magna eget est lorem ipsum dolor sit.
          Maecenas pharetra convallis posuere morbi leo urna molestie at
          elementum. Libero nunc consequat interdum varius sit amet mattis.
          Libero justo laoreet sit amet cursus. Condimentum mattis pellentesque
          id nibh tortor. Sem fringilla ut morbi tincidunt augue. Aliquet
          sagittis id consectetur purus ut faucibus pulvinar. Ut sem viverra
          aliquet eget sit amet tellus cras adipiscing. Ut morbi tincidunt augue
          interdum velit euismod in pellentesque massa. Donec ac odio tempor
          orci dapibus ultrices. Ultrices dui sapien eget mi proin. Consectetur
          purus ut faucibus pulvinar. Vivamus arcu felis bibendum ut tristique
          et. Sit amet commodo nulla facilisi. Nunc sed velit dignissim sodales
          ut eu sem integer. Enim nunc faucibus a pellentesque. Lectus mauris
          ultrices eros in cursus turpis massa tincidunt dui. Viverra tellus in
          hac habitasse platea dictumst vestibulum rhoncus est. Pellentesque sit
          amet porttitor eget dolor morbi. Vitae tortor condimentum lacinia
          quis.
        </p>
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
