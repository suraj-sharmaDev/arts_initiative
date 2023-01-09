import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { generateServerSideProps } from "@/lib/auth";

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return <div></div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return generateServerSideProps(context);
};

export default Home;
