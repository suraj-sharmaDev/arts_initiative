import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { TopCollections } from "@/components/interfaces/Account/Client/Home";
import { generateServerSideProps } from "@/lib/auth";

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
  return generateServerSideProps(context);
};

export default Home;
