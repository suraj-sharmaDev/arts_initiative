import type { Session } from "next-auth";
import { getMongoDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { availableRoles } from "@/lib/roles";

export const createUser = async (param: {
  name: string;
  email: string;
  password?: string;
  role?: string;
}) => {
  const db = await getMongoDb();
  const { name, email, password, role } = param;
  return await db.collection("users").insertOne({
    name,
    email,
    password: password ? password : "",
    emailVerified: new Date(),
    role: role ? role : availableRoles.member,
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

export const getUserRoleBySession = async (session: Session | null) => {
  if (session === null || session.user === null) {
    return null;
  }

  const _id = session?.user?.id;

  if (!_id) {
    return null;
  }

  return await getUser({ _id: new ObjectId(_id) }).then((user: any) => {
    if (user?.role) return user?.role;
    // else update user with member role and then return role
    updateUser({ _id: new ObjectId(_id) }, { role: availableRoles.member.id });
    return availableRoles.member.id;
  });
};

export const updateUser = async (
  key: { _id: ObjectId } | { email: string },
  params: {
    role?: string;
  }
) => {
  const db = await getMongoDb();
  return await db
    .collection("users")
    .updateOne({ ...key }, { $set: { ...params } });
};

export const deleteUser = async (key: { _id: string } | { email: string }) => {
  const db = await getMongoDb();
  return await db.collection("users").deleteOne({
    where: key,
  });
};
