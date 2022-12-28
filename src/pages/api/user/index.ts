import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/models/user";
import { getSession } from "@/lib/session";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// Get User data
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const users = await getUser({
    _id: new ObjectId(session?.user.id as string),
  });

  return res.status(200).json({ data: users, error: null });
};
