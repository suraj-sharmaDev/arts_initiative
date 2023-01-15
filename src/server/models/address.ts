import { getMongoDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const createAddress = async (key: { userId: ObjectId }, params: any) => {
  const db = await getMongoDb();
  const insertedAddresses = await db
    .collection("address")
    .findOne({ isDefault: true });
  if (insertedAddresses == null) {
    params.isDefault = true;
  }
  return await db.collection("address").insertOne({
    userId: key.userId,
    ...params,
  });
};

export const getAddress = async (
  key: {
    userId?: ObjectId;
    _id?: ObjectId;
  },
  params?: any
) => {
  return new Promise((resolve, reject) => {
    getMongoDb()
      .then((db) => {
        db.collection("address")
          .find({
            ...(key._id && { _id: key._id }),
            ...(key.userId && { userId: key.userId }),
            ...(params && params),
          })
          .toArray((error, result) => {
            if (error) throw error;
            resolve(JSON.parse(JSON.stringify(result)));
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateAddress = async (
  key: { userId: ObjectId; _id: ObjectId },
  params: any
) => {
  const db = await getMongoDb();
  // if it were to update default address then we have to set
  // all other addresses default property to false for the user
  if (params?.isDefault && key.userId) {
    await db.collection("address").updateMany(
      {
        userId: key.userId,
      },
      {
        $set: {
          isDefault: false,
        },
      }
    );
  }
  return await db.collection("address").updateOne(
    {
      ...(key._id && { _id: key._id }),
      ...(key.userId && { userId: key.userId }),
    },
    {
      $set: {
        ...params,
      },
    }
  );
};

export const deleteAddress = async (key: {
  userId: ObjectId;
  _id: ObjectId;
}) => {
  const db = await getMongoDb();
  return await db.collection("address").deleteOne({
    ...(key._id && { _id: key._id }),
    ...(key.userId && { userId: key.userId }),
  });
};
