import { ReactElement } from "react";
import type { NextPageWithLayout } from "../types";
import { BaseLayout } from "@/components/layouts";
import { GetServerSidePropsContext } from "next";
import { Creative, Features, HeroSection } from "@/components/interfaces/Home";
import { useRouter } from "next/router";
import { generateServerSideProps } from "@/lib/auth";

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
  return generateServerSideProps(context, false);
};

export default Home;
