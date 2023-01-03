import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "@/types/next";
import { Card } from "@/components/ui";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@/lib/session";
import env from "@/lib/env";
import { TopCollections } from "@/components/interfaces/Account/Client/Home";

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <div>
      <TopCollections />
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context.req, context.res);
  const { locale }: GetServerSidePropsContext = context;
  // console.log({ session });

  if (!session) {
    return {
      redirect: {
        destination: env.redirectOnunAuth,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
