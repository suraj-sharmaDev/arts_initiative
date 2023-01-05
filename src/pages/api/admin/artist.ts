import { availableRoles } from "@/lib/roles";
import { getAllUsers } from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

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

// get artists
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const artists = await getAllUsers({ role: availableRoles.artist.id });
  return res.status(200).json({ data: artists, error: null });
};
