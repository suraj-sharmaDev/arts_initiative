import { getSession } from "@/lib/session";
import {
  deleteTeam,
  getTeam,
  getTeamMembers,
  isTeamMember,
  isTeamOwner,
} from "@/models/team";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGET(req, res);
      return;
    case "POST":
      handlePOST(req, res);
      return;
    case "PUT":
      handlePUT(req, res);
      return;
    case "DELETE":
      handleDELETE(req, res);
      return;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// Get a team by its slug
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const session = await getSession(req, res);
  const userId = session?.user?.id as string;

  const team: any = await getTeamMembers(slug as string);

  if (!(team && (await isTeamMember(userId, team._id.toString())))) {
    return res.status(400).json({
      data: null,
      error: { message: "Bad request." },
    });
  }

  return res.status(200).json({ data: team, error: null });
};
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {};
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {};
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(200).json({
      data: null,
      error: { message: `Team slug not provided` },
    });
  }

  const session = await getSession(req, res);
  const userId = session?.user?.id as string;

  const team = await getTeam({ slug: slug as string });

  if (!(team && (await isTeamOwner(userId, team._id.toString())))) {
    return res.status(200).json({
      data: null,
      error: { message: `You don't have permission to do this action.` },
    });
  }

  await deleteTeam({ slug });

  return res.status(200).json({ data: {}, error: null });
};
