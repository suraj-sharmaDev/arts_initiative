import { getMongoDb } from "@/lib/mongodb";
import unlink from "@/lib/unlink";
import { ObjectId } from "mongodb";

export const getArtwork = async (param: {
  artworkName?: string;
  artworkDescription?: string;
  galleryId?: ObjectId;
  artworkImage?: string;
  isSponsored?: boolean;
}) => {
  return new Promise((resolve, reject) => {
    getMongoDb().then((db) => {
      db.collection("artwork")
        .find({ ...param })
        .toArray((error, result) => {
          if (error) throw error;
          resolve(JSON.parse(JSON.stringify(result)));
        });
    });
  });
};

export const createArtwork = async (param: {
  artworkName: string;
  artworkDescription: string;
  galleryId: string;
  artworkImage: string;
  isSponsored: string;
}) => {
  const db = await getMongoDb();
  return await db.collection("artwork").insertOne({
    ...param,
    ...(param.isSponsored && { isSponsored: param.isSponsored == "true" }),
    galleryId: new ObjectId(param.galleryId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const updateArtwork = async (
  key: { _id: string },
  param: {
    artworkName: string;
    artworkDescription: string;
    galleryId: string;
    artworkImage: string;
    isSponsored: string;
  }
) => {
  const db = await getMongoDb();
  const artwork = await db
    .collection("artwork")
    .findOne({ _id: new ObjectId(key._id) });

  if (param.artworkImage) {
    // new image uploaded so delete previous file
    await unlink(artwork?.artworkImage);
  }
  return await db.collection("artwork").updateOne(
    {
      _id: new ObjectId(key._id),
    },
    {
      $set: {
        ...param,
        ...(param.isSponsored && { isSponsored: param.isSponsored == "true" }),
        ...(param.galleryId && { galleryId: new ObjectId(param.galleryId) }),
        updatedAt: new Date(),
      },
    }
  );
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
