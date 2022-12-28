import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "@/types/next";
import { Card } from "@/components/ui";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@/lib/session";
import env from "@/lib/env";

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <Card heading="Dashboard">
      <Card.Body>
        <div className="p-3">
          <p className="text-sm">
            {`Hi, ${session?.user.name} 
              "you-have-logged-in-using" ${session?.user.email}`}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context.req, context.res);
  const { locale }: GetServerSidePropsContext = context;
  // console.log({ session });

  if (!session) {
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

export default Dashboard;
