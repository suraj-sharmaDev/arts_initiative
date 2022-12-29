import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ScrollableGallery from "@/components/ui/Account/ScrollableGallery";
import { Alert, Error, Loading } from "@/components/ui";
import env from "@/lib/env";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { getSession } from "@/lib/session";
import { NextPageWithLayout } from "@/types/next";
import useGallery from "@/hooks/useGallery";

const Profile: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  userId,
}) => {
  const { isLoading, isError, userGallery } = useGallery(userId);

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
  const session = await getSession(context.req, context.res);
  const { locale }: GetServerSidePropsContext = context;

  if (!session) {
    return {
      redirect: {
        destination: env.redirectOnunAuth,
      },
    };
  }

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      userId: session.user.id,
    },
  };
};

export default Profile;
