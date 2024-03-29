import { getUserRoleBySession } from "@/models/user";
import { compare, hash } from "bcryptjs";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import env from "./env";
import {
  availableRoles,
  blackListedPathForRole,
  whiteListedPathForRole,
} from "./roles";
import { getSession } from "./session";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function getRedirectUrlFromSession(session: Session) {
  const userRole: string = await getUserRoleBySession(session);
  return availableRoles?.[userRole].redirectAfterAuth;
}

export async function generateServerSideProps(
  context: GetServerSidePropsContext,
  forceLogin = true
) {
  const session = await getSession(context.req, context.res);
  const { locale }: GetServerSidePropsContext = context;
  if (!session) {
    return {
      ...(forceLogin
        ? {
            redirect: {
              destination: env.redirectOnunAuth,
            },
          }
        : {
            props: {
              ...(locale
                ? await serverSideTranslations(locale, ["common"])
                : {}),
              userId: "",
              user: null,
            },
          }),
    };
  }
  const currentPath = context.resolvedUrl.split("/")[1];
  const userRole = await getUserRoleBySession(session);
  // we have to now test if the user is allowed in this url
  if (blackListedPathForRole?.[userRole].includes(currentPath)) {
    // if user enters restricted path then redirect
    return {
      redirect: {
        destination: whiteListedPathForRole?.[userRole],
      },
    };
  }
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      userId: session.user.id,
      user: session.user,
    },
  };
}
