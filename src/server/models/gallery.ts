import type { Session } from "next-auth";
import { getMongoDb } from "@/lib/mongodb";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { ObjectId } from "mongodb";

export const getGallery = async (query: NextApiRequestQuery | any) => {
  return new Promise((resolve, reject) => {
    getMongoDb()
      .then((db) => {
        db.collection("gallery")
          .aggregate([
            {
              $match: {
                ...query,
              },
            },
            {
              $lookup: {
                from: "artwork",
                localField: "_id",
                foreignField: "galleryId",
                as: "artworks",
              },
            },
          ])
          .toArray((err, result) => {
            if (err) throw err;
            resolve(JSON.parse(JSON.stringify(result)));
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createGallery = async (
  userId: ObjectId,
  galleryName: string,
  galleryDescription: string
) => {
  const db = await getMongoDb();
  return await db.collection("gallery").insertOne({
    galleryName,
    galleryDescription,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const addUserToGallery = async (_id: ObjectId, userId: ObjectId) => {
  const db = await getMongoDb();
  return await db.collection("gallery").updateOne({ _id }, { userId });
};

export const isGalleryExists = async (condition: any) => {
  const db = await getMongoDb();
  return await db.collection("gallery").findOne(condition);
};
