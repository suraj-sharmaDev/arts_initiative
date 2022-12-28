import type { Session } from "next-auth";
import { getMongoDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const createUser = async (param: {
  name: string;
  email: string;
  password?: string;
}) => {
  const db = await getMongoDb();
  const { name, email, password } = param;
  return await db.collection("users").insertOne({
    name,
    email,
    password: password ? password : "",
    emailVerified: new Date(),
  });
};

export const getUser = async (key: { _id: ObjectId } | { email: string }) => {
  const db = await getMongoDb();
  return await db.collection("users").findOne(key);
};

export const getUserBySession = async (session: Session | null) => {
  if (session === null || session.user === null) {
    return null;
  }

  const _id = session?.user?.id;

  if (!_id) {
    return null;
  }

  return await getUser({ _id: new ObjectId(_id) });
};

export const deleteUser = async (key: { _id: string } | { email: string }) => {
  const db = await getMongoDb();
  return await db.collection("users").deleteOne({
    where: key,
  });
};
