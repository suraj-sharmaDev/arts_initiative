import type { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import type { NextPageWithLayout } from "@/types/index";
import { AuthLayout } from "@/components/layouts";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { getInviteParsedCookie } from "@/lib/cookie";
import JoinWithInvitation from "@/components/interfaces/Auth/JoinWithInvitation";
import Join from "@/components/interfaces/Auth/Join";
import GoogleButton from "@/components/interfaces/Auth/GoogleButton";

const Signup: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  inviteToken,
  next,
}) => {
  const { status } = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <>
      <div className="rounded-md bg-white p-6 shadow-sm">
        {inviteToken ? (
          <JoinWithInvitation inviteToken={inviteToken} next={next} />
        ) : (
          <Join />
        )}
        <div className="divider">or</div>
        <div className="space-y-3">
          <GoogleButton />
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        {t("already-have-an-account")}
        <Link href="/auth/login">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            &nbsp;{t("sign-in")}
          </span>
        </Link>
      </p>
    </>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      heading="Create an account"
      description="Join our community of artists!"
    >
      {page}
    </AuthLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res, locale }: GetServerSidePropsContext = context;

  const cookieParsed = getInviteParsedCookie(req, res);

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      inviteToken: cookieParsed.token,
      next: cookieParsed.url ?? "/auth/login",
    },
  };
};

export default Signup;
