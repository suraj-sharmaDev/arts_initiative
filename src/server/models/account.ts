import { getMongoDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const getAccount = async (key: { userId: ObjectId }) => {
  const db = await getMongoDb();
  return await db.collection("accounts").findOne(key);
};
