import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "@/types/next";
import { Card, Loading } from "@/components/ui";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@/lib/session";
import env from "@/lib/env";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useTeam from "@/hooks/useTeam";
import useTeamMembers from "@/hooks/useTeamMembers";

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { team, isError, isLoading } = useTeam();
  if (isLoading) return <Loading />;

  console.log(team);

  return (
    <div className="">
      Team members
      <p>Here</p>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context.req, context.res);
  const { locale }: GetServerSidePropsContext = context;

  if (!session) {
    return {
      redirect: {
        destination: env.redirectOnunAuth,
      },
    };
  }

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default Dashboard;
