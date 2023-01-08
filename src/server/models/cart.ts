import { getMongoDb } from "@/lib/mongodb";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { ObjectId } from "mongodb";

export const getUserCart = async (key: { userId: string }) => {
  const db = await getMongoDb();
  return await db
    .collection("cart")
    .findOne({ userId: new ObjectId(key.userId) });
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
    items: { ...param },
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
