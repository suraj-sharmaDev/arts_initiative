import { getSession } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import getFilesInReq from "@/lib/getFilesInReq";
import upload from "@/lib/upload";
import formidable from "formidable";

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
  for (const key in files) {
    const file = files[key] as formidable.File;
    await upload(file, userId ? userId : "temp");
  }

  res.status(200).json({
    ok: "bok",
  });
};
