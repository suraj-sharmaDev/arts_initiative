import { getMongoDb } from "@/lib/mongodb";
import { Condition, ObjectId } from "mongodb";

export const createTeam = async (param: {
  userId: string;
  name: string;
  slug: string;
}) => {
  const { userId, name, slug } = param;
  const db = await getMongoDb();

  const team = await db.collection("teams").insertOne({ name, slug });
  await addTeamMember(team.insertedId.toString(), userId, "owner");
  return team;
};

export const getTeam = async (
  key: { _id: ObjectId } | { slug: string | null }
) => {
  const db = await getMongoDb();
  return await db.collection("teams").findOne(key);
};

export const deleteTeam = async (
  key: { _id: ObjectId } | { slug: string | string[] }
) => {
  const db = await getMongoDb();
  return await db.collection("teams").deleteOne(key);
};

export const addTeamMember = async (
  teamId: string,
  userId: string,
  role: string
) => {
  const db = await getMongoDb();
  return await db.collection("teamMembers").insertOne({
    userId: new ObjectId(userId),
    teamId: new ObjectId(teamId),
    role,
  });
};

export const removeTeamMember = async (teamId: string, userId: string) => {
  const db = await getMongoDb();
  return await db
    .collection("teamMembers")
    .deleteOne({ teamId: new ObjectId(teamId), userId: new ObjectId(userId) });
};

export const getTeams = async (userId: string) => {
  return new Promise(async (resolve, reject) => {
    const db = await getMongoDb();
    db.collection("teamMembers")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "teams",
            localField: "teamId",
            foreignField: "_id",
            as: "teams",
          },
        },
      ])
      .toArray((err, data) => {
        if (!err) resolve(data);
        reject(err);
      });
  });
};

export async function isTeamMember(userId: string, teamId: string) {
  const db = await getMongoDb();
  const member = await db
    .collection("teamMembers")
    .findOne({ teamId: new ObjectId(teamId), userId: new ObjectId(userId) });
  return member != null;
}

export async function isTeamOwner(userId: string, teamId: string) {
  const db = await getMongoDb();
  const member = await db.collection("teamMembers").findOne({
    teamId: new ObjectId(teamId),
    userId: new ObjectId(userId),
    role: "owner",
  });
  return member != null;
}

export const getTeamMembers = async (slug: string) => {
  return new Promise(async (resolve, reject) => {
    const db = await getMongoDb();
    db.collection("teams")
      .aggregate([
        {
          $match: {
            slug,
          },
        },
        {
          $lookup: {
            from: "teamMembers",
            localField: "_id",
            foreignField: "teamId",
            as: "teamMembers",
          },
        },
      ])
      .toArray((err, data) => {
        // since it returns info about only one team
        // resolve 0th index
        if (!err) resolve(data?.[0]);
        reject(err);
      });
  });
};

export const updateTeam = async (slug: string, data: any) => {
  const db = await getMongoDb();
  return await db.collection("teams").updateOne(
    {
      slug,
    },
    {
      ...data,
    }
  );
};

export const isTeamExists = async (condition: Condition<any>) => {
  const db = await getMongoDb();
  return await db.collection("teams").countDocuments({ ...condition });
};
