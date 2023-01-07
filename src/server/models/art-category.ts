import { getMongoDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const getArtCategory = async (key: { _id: ObjectId }) => {
  const db = await getMongoDb();
  return await db.collection("artCategory").findOne(key);
};

export const getAllArtCategory = async () => {
  return new Promise((resolve, reject) => {
    getMongoDb().then((db) => {
      db.collection("artCategory")
        .find({})
        .toArray((err, result) => {
          resolve(JSON.parse(JSON.stringify(result)));
        });
    });
  });
};

export const createArtCategory = async (param: {
  categoryName: string;
  categoryTag: string;
  categoryDescription: string;
}) => {
  const db = await getMongoDb();
  return await db.collection("artCategory").insertOne(param);
};

export const updateArtCategory = async (
  key: { _id: ObjectId },
  param: {
    categoryName: string;
    categoryTag: string;
    categoryDescription: string;
  }
) => {
  const db = await getMongoDb();
  return await db
    .collection("artCategory")
    .updateOne(key, { $set: { ...param } });
};

export const deleteArtCategory = async (key: { _id: ObjectId }) => {
  const db = await getMongoDb();
  return await db.collection("artCategory").deleteOne(key);
};
