import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser } from "@/models/user";
import { getSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { hashPassword } from "@/lib/auth";
import { availableRoles } from "@/lib/roles";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (
    !req.headers?.["x-api-key"] ||
    req.headers?.["x-api-key"] != process.env.ADMIN_API_KEY
  ) {
    return res.status(401).json({
      data: [],
      error: {
        message: "Access Not Allowed",
      },
    });
  }

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
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

// Create admin user
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  const existingUser = await getUser({ email });
  if (existingUser) {
    return res.status(400).json({
      data: null,
      error: {
        message:
          "An user with this email already exists or the email was invalid.",
      },
    });
  }

  const user: any = await createUser({
    name,
    email,
    password: await hashPassword(password),
    role: availableRoles.admin.id,
  });

  return res.status(200).json({ data: user, error: null });
};
