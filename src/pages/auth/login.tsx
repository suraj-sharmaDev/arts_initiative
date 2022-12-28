import type { NextPageWithLayout } from "src/types";
import { ReactElement } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button } from "react-daisyui";

import { InputWithLabel } from "@/components/ui";
import { AuthLayout } from "@/components/layouts";
import { getParsedCookie } from "@/lib/cookie";
import GoogleButton from "@/components/interfaces/Auth/GoogleButton";
import { getSession } from "@/lib/session";
import env from "@/lib/env";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Login: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken, redirectAfterSignIn }) => {
  const { status } = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  if (status == "authenticated") {
    router.push(redirectAfterSignIn);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(5),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const response = await signIn("credentials", {
        email,
        password,
        csrfToken,
        redirect: false,
        callbackUrl: redirectAfterSignIn,
      });

      if (!response?.ok) {
        toast.error(t("login-error"));
        return;
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="rounded-md bg-white p-6 shadow-sm">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <InputWithLabel
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              active={formik.dirty}
              fullWidth
            >
              {t("sign-in")}
            </Button>
          </div>
        </form>
        <div className="divider">or</div>
        <div className="space-y-3">
          <GoogleButton />
        </div>
      </div>
      <p className="text-center text-sm text-gray-600">
        {t("dont-have-an-account")}
        <Link href="/auth/join">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            &nbsp;{t("create-a-free-account")}
          </span>
        </Link>
      </p>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
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
  }
  console.log("here in getsERVERPOPR");
  const cookieParsed = getParsedCookie(req, res);
  console.log({ cookieParsed });
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      csrfToken: await getCsrfToken(context),
      redirectAfterSignIn: cookieParsed.url ?? env.redirectAfterSignIn,
    },
  };
};

export default Login;
