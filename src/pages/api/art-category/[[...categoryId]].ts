import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createArtCategory,
  getAllArtCategory,
  getArtCategory,
  updateArtCategory,
} from "@/models/art-category";

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
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryId = req.query.categoryId?.[0];
  let category = null;
  if (categoryId) {
    category = await getArtCategory({ _id: new ObjectId(categoryId) });
  } else {
    category = await getAllArtCategory();
  }
  return res.status(200).json({ data: category, error: null });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const category = await createArtCategory(req.body);
  return res.status(200).json({ data: category, error: null });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryId = req.query.categoryId?.[0];
  if (!categoryId) {
    return res.status(200).json({
      data: null,
      error: {
        message: "Category Id not passed as params",
      },
    });
  }
  const category = await updateArtCategory(
    { _id: new ObjectId(categoryId) },
    req.body
  );
  return res.status(200).json({ data: category, error: null });
};
