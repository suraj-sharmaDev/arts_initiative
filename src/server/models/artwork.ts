import { getMongoDb } from "@/lib/mongodb";
import unlink from "@/lib/unlink";
import { ObjectId } from "mongodb";

export const createArtwork = async (param: {
  artworkName: string;
  artworkDescription: string;
  galleryId: string;
  artworkImage: string;
}) => {
  const db = await getMongoDb();
  return await db.collection("artwork").insertOne({
    ...param,
    galleryId: new ObjectId(param.galleryId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const deleteArtwork = async (param: {
  artworkName?: string;
  artworkDescription?: string;
  artworkId: string;
}) => {
  const db = await getMongoDb();
  const artwork = await db.collection("artwork").findOne({
    ...(param.artworkName && { artworkName: param.artworkName }),
    ...(param.artworkDescription && {
      artworkDescription: param.artworkDescription,
    }),
    ...(param.artworkId && { _id: new ObjectId(param.artworkId) }),
  });

  const imageDir = artwork?.artworkImage;
  await unlink(imageDir);
  return await db.collection("artwork").deleteOne({ _id: artwork?._id });
};
