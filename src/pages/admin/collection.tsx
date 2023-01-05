import AdminLayout from "@/components/layouts/AdminLayout";
import { generateServerSideProps } from "@/lib/auth";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement } from "react";

const Collection: NextPageWithLayout = () => {
  return <div>Create Artist</div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return generateServerSideProps(context);
};

Collection.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Collection;
