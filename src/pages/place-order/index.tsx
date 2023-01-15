import { BaseLayout } from "@/components/layouts";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { NextPageWithLayout } from "@/types/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement } from "react";

const PlaceOrder: NextPageWithLayout<
  inferSSRProps<typeof getServerSideProps>
> = () => {
  return (
    <div>
      <span>Place order page</span>
    </div>
  );
};

PlaceOrder.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale }: GetServerSidePropsContext = context;
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default PlaceOrder;
