import type { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import { ObjectId } from "mongodb";

export const getInviteParsedCookie = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
): {
  token: string | null;
  url: string | null;
} => {
  const cookie = getCookie("pending-invite", { req, res });

  return cookie
    ? JSON.parse(cookie as string)
    : {
        token: null,
        url: null,
      };
};

export const getGuestUserParsedCookie = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
): {
  userId: string | null;
} => {
  let cookie = getCookie("guest-user-id", { req, res });
  if (cookie == undefined) {
    // if it doesn't exist then generate one
    const userId = new ObjectId();
    setCookie("guest-user-id", { userId }, { req, res });
    cookie = JSON.stringify({
      userId,
    });
  }

  return cookie
    ? JSON.parse(cookie as string)
    : {
        userId: null,
      };
};
