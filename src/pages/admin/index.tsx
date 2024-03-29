import AdminLayout from "@/components/layouts/AdminLayout";
import { generateServerSideProps } from "@/lib/auth";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return <div>This is admin</div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return generateServerSideProps(context);
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
