import { GetServerSidePropsContext } from "next";
import ScrollableGallery from "@/components/ui/Account/Client/ScrollableGallery";
import { Alert, Error, Loading } from "@/components/ui";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { NextPageWithLayout } from "@/types/next";
import useGallery from "@/hooks/useGallery";
import { generateServerSideProps } from "@/lib/auth";

const Profile: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  userId,
}) => {
  const { isLoading, isError, userGallery } = useGallery({ userId });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <ScrollableGallery
        heading="Your gallery"
        galleryItems={userGallery}
        userId={userId}
      />
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return generateServerSideProps(context);
};

export default Profile;
