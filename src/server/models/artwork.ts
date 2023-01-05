import { getMongoDb } from "@/lib/mongodb";
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
