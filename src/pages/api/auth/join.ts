import type { NextApiRequest, NextApiResponse } from "next";

import { createUser, getUser } from "@/models/user";
import { createTeam, isTeamExists } from "@/models/team";
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
  const { name, email, password, team } = JSON.parse(req.body);

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

  // Create a new team
  if (team) {
    const slug = slugify(team);
    console.log(slug);

    const nameCollisions = await isTeamExists({ name: team, slug });

    if (nameCollisions > 0) {
      return res.status(400).json({
        data: null,
        error: {
          message: "A team with this name already exists in our database.",
        },
      });
    }
  }

  const user: any = await createUser({
    name,
    email,
    password: await hashPassword(password),
  });

  if (team) {
    const slug = slugify(team);

    await createTeam({
      userId: user.insertedId,
      name: team,
      slug,
    });

    sendWelcomeEmail(name, email, team);
  }

  return res.status(200).json({ data: user, error: null });
};
