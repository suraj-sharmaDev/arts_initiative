import type { NextApiRequest } from "next";
import path from "path";

export const createRandomString = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let string = "";

  for (let i = 0; i < length; i++) {
    string += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return string;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

// Fetch the auth token from the request headers
export const extractAuthToken = (req: NextApiRequest): string | null => {
  const authHeader = req.headers.authorization || null;

  return authHeader ? authHeader.split(" ")[1] : null;
};

// create url query from json object
export const jsonToUrlQuery = (obj: object | any) => {
  if (Object.keys(obj).length == 0) return "";
  return Object.keys(obj).reduce((query: string, key: string) => {
    return query + key + "=" + obj[key] + "&";
  }, "?");
};

export const extractFileExt = (fileName: string | null) => {
  if (fileName == null) return null;
  return path.extname(fileName).split(".")[1];
};
