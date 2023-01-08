import { getGuestUserParsedCookie } from "@/lib/cookie";
import { getSession } from "@/lib/session";
import {
  createUserCart,
  deleteUserCart,
  getUserCart,
  updateUserCart,
} from "@/models/cart";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    case "PUT":
      return handlePUT(req, res);
    case "DELETE":
      return handleDELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const cookie = getGuestUserParsedCookie(req, res);
  const userId = session?.user.id || cookie.userId;
  const data = await getUserCart({ userId: userId as string });
  return res.status(200).json({ data, error: null });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const cookie = getGuestUserParsedCookie(req, res);
  const userId = session?.user.id || cookie.userId;
  const data = await createUserCart({ userId: userId as string }, req.body);
  return res.status(200).json({ data, error: null });
};

// eslint-disable-next-line
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const cookie = getGuestUserParsedCookie(req, res);
  const userId = session?.user.id || cookie.userId;
  const { cartId } = req.query;
  const data = await updateUserCart(
    {
      ...(userId && { userId: userId as string }),
      ...(cartId && { _id: cartId as string }),
    },
    req.body
  );
  return res.status(200).json({ data, error: null });
};
// eslint-disable-next-line
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const cookie = getGuestUserParsedCookie(req, res);
  const userId = session?.user.id || cookie.userId;
  const { cartId } = req.query;
  const data = await deleteUserCart({
    ...(userId && { userId: userId as string }),
    ...(cartId && { _id: cartId[0] as string }),
  });
  return res.status(200).json({ data, error: null });
};
