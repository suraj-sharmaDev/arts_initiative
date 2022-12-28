import { ReactElement } from "react";
import type { NextPageWithLayout } from "../types";
import { AuthLayout, AccountLayout } from "@/components/layouts";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import env from "@/lib/env";
import { getSession } from "@/lib/session";

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <main>Some data here</main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
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
  } else {
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
