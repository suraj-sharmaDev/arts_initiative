import { getSession } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import getFilesInReq from "@/lib/getFilesInReq";
import upload from "@/lib/upload";
import formidable from "formidable";
import {
  createArtwork,
  deleteArtwork,
  getArtwork,
  updateArtwork,
} from "@/models/artwork";
import { ObjectId } from "mongodb";

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
    case "PUT":
      return handlePUT(req, res);
    case "DELETE":
      return handleDELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// eslint-disable-next-line
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    artworkName,
    artworkDescription,
    galleryId,
    artworkImage,
    isSponsored,
  } = req.query;

  const artworks = await getArtwork({
    ...(typeof artworkName != "undefined" && {
      artworkName: artworkName as string,
    }),
    ...(typeof artworkDescription != "undefined" && {
      artworkDescription: artworkDescription as string,
    }),
    ...(typeof artworkImage != "undefined" && {
      artworkImage: artworkImage as string,
    }),
    ...(typeof isSponsored != "undefined" && {
      isSponsored: isSponsored == "true",
    }),
    ...(typeof galleryId != "undefined" && {
      galleryId: new ObjectId(galleryId as string),
    }),
  });
  return res.status(200).json({ data: artworks, error: null });
};

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
    const { url, public_id } = await upload(file);
    if (fields) {
      fields[key] = url as string;
      fields["artworkImagePublicId"] = public_id as string;
    }
  }
  const artwork = await createArtwork(fields as any);
  return res.status(200).json({ data: artwork, error: null });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const artworkId = req.query.artworkId?.[0];
  if (!artworkId) {
    return res.status(200).json({
      data: null,
      error: {
        message: "ArtworkId not passed as params",
      },
    });
  }

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
    const { url, public_id } = await upload(file);
    if (fields) {
      fields[key] = url as string;
      fields["artworkImagePublicId"] = public_id as string;
    }
  }

  const artwork = await updateArtwork({ _id: artworkId }, fields as any);
  return res.status(200).json({ data: artwork, error: null });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const artworkId = req.query.artworkId?.[0];
  if (!artworkId) {
    return res.status(200).json({
      data: null,
      error: {
        message: "ArtworkId not passed as params",
      },
    });
  }
  const artwork = await deleteArtwork({ artworkId });
  return res.status(200).json({ data: artwork, error: null });
};
