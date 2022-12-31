import { ReactElement } from "react";
import type { NextPageWithLayout } from "../types";
import { BaseLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import env from "@/lib/env";
import { getSession } from "@/lib/session";
import { Creative, Features, HeroSection } from "@/components/interfaces/Home";
import { useRouter } from "next/router";

const Home: NextPageWithLayout = (props) => {
  const router = useRouter();

  const onClickCartBtn = () => router.push("/auth/login");

  return (
    <div className="w-full space-y-6">
      <HeroSection />
      <Features onClickCartBtn={onClickCartBtn} />
      <Creative onClickCartBtn={onClickCartBtn} />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res, locale }: GetServerSidePropsContext = context;
  const session = await getSession(req, res);
  if (session) {
    return {
      redirect: {
        destination: env.redirectAfterSignIn,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
