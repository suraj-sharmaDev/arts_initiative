import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@/lib/session";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/models/address";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    case "PUT":
      return handlePUT(req, res);
    case "DELETE":
      return handleDELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const userId = session?.user.id as string;
  const addressId = req.query.addressId?.[0];
  const address = await getAddress(
    {
      ...(userId && { userId: new ObjectId(userId) }),
      ...(addressId && { _id: new ObjectId(addressId) }),
    },
    {
      ...req.query,
      ...(req.query.isDefault && { isDefault: req.query.isDefault == "true" }),
    }
  );
  return res.status(200).json({ data: address, error: null });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const userId = session?.user.id as string;
  const address = await createAddress(
    { userId: new ObjectId(userId) },
    req.body
  );
  return res.status(200).json({ data: address, error: null });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const userId = session?.user.id as string;
  const addressId = req.query.addressId?.[0];
  if (!addressId) {
    return res.status(200).json({
      data: null,
      error: {
        message: "Address Id not passed as params",
      },
    });
  }
  const address = await updateAddress(
    {
      userId: new ObjectId(userId),
      _id: new ObjectId(addressId),
    },
    req.body
  );

  return res.status(200).json({ data: address, error: null });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const userId = session?.user.id as string;
  const addressId = req.query.addressId?.[0];
  if (!addressId) {
    return res.status(200).json({
      data: null,
      error: {
        message: "Address Id not passed as params",
      },
    });
  }
  const address = await deleteAddress({
    userId: new ObjectId(userId),
    _id: new ObjectId(addressId),
  });

  return res.status(200).json({ data: address, error: null });
};
