import { getSession } from "@/lib/session";
import { createGallery, getGallery, isGalleryExists } from "@/models/gallery";
import { getUser } from "@/models/user";
import { ObjectId } from "mongodb";
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
  const { userId, galleryId } = req.query;
  const gallery = await getGallery({
    ...(userId && { userId: new ObjectId(userId as string) }),
    ...(galleryId && { _id: new ObjectId(galleryId as string) }),
  });
  return res.status(200).json({ data: gallery, error: null });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { galleryName, galleryDescription } = req.body;
  const session = await getSession(req, res);
  const userId = session?.user.id;

  if (await isGalleryExists({ galleryName, userId: new ObjectId(userId) })) {
    return res.status(200).json({
      data: null,
      error: {
        message: "Gallery already exists with same name!",
      },
    });
  }

  const gallery = await createGallery(
    new ObjectId(userId),
    galleryName as string,
    galleryDescription as string
  );

  return res.status(200).json({ data: gallery, error: null });
};

// eslint-disable-next-line
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {};
// eslint-disable-next-line
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {};
