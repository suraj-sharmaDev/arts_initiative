import { getSession } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import getFilesInReq from "@/lib/getFilesInReq";
import upload from "@/lib/upload";
import formidable from "formidable";
import { createArtwork } from "@/models/artwork";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
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

// eslint-disable-next-line
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const userId = session?.user.id;

  const { err, fields, files } = await getFilesInReq(req);
  if (err) {
    return res
      .status(200)
      .json({ error: { message: "Could not upload file" }, data: null });
  }

  if (!fields) {
    return res
      .status(200)
      .json({ error: { message: "Could not parse form data!" }, data: null });
  }

  for (const untypedKey in files) {
    const key = untypedKey as string;
    const file = files[key] as formidable.File;
    const filePath = await upload(file, userId ? userId : "temp");
    if (fields) fields[key] = filePath as string;
  }
  const artwork = createArtwork(fields as any);
  return res.status(200).json({ data: artwork, error: null });
};
