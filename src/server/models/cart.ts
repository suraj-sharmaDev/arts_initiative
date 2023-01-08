import { getMongoDb } from "@/lib/mongodb";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { ObjectId } from "mongodb";

export const getUserCart = async (key: { userId: string }) => {
  return new Promise((resolve, reject) => {
    getMongoDb().then((db) => {
      db.collection("cart")
        .find({ userId: new ObjectId(key.userId) })
        .toArray((error, result) => {
          if (error) throw error;
          resolve(JSON.parse(JSON.stringify(result)));
        });
    });
  });
};

export const createUserCart = async (
  key: { userId: string },
  param: {
    artworkId: ObjectId;
    price: number;
  }
) => {
  const db = await getMongoDb();
  return await db.collection("cart").insertOne({
    userId: new ObjectId(key.userId),
    ...(param.artworkId && { artworkId: new ObjectId(param.artworkId) }),
    ...(param.price && { price: param.price }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const updateUserCart = async (
  key: { _id?: string; userId?: string },
  param: any
) => {
  const db = await getMongoDb();
  return await db.collection("cart").updateMany(
    {
      ...(key._id && { _id: new ObjectId(key._id) }),
      ...(key.userId && { userId: new ObjectId(key.userId) }),
    },
    { ...param }
  );
};

export const deleteUserCart = async (key: {
  _id?: string;
  userId?: string;
}) => {
  const db = await getMongoDb();
  return await db.collection("cart").deleteMany({
    ...(key._id && { _id: new ObjectId(key._id) }),
    ...(key.userId && { userId: new ObjectId(key.userId) }),
  });
};
