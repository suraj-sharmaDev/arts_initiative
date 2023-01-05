import type { NextApiRequest, NextApiResponse } from "next";

import { createUser, getUser } from "@/models/user";
import { slugify } from "@/lib/commons";
import { hashPassword } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email/sendWelcomeEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// Signup the user
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } =
    typeof req.body == "object" ? req.body : JSON.parse(req.body);

  const existingUser = await getUser({ email });

  if (existingUser) {
    return res.status(200).json({
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
    role,
  });

  return res.status(200).json({ data: user, error: null });
};
