import {
  AddArtCategory,
  ListArtCategory,
} from "@/components/interfaces/Account/Admin";
import AdminLayout from "@/components/layouts/AdminLayout";
import { generateServerSideProps } from "@/lib/auth";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement } from "react";

const Collection: NextPageWithLayout = () => {
  return (
    <div>
      <AddArtCategory />
      <ListArtCategory />
    </div>
  );
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
