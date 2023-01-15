import { promises as fs } from "fs";
import path from "path";
import cloudinary from "./cloudinary";

const baseDirectory = path.join(process.cwd(), "/public");

const unlink = async (folderName: string, isCloudinary: boolean) => {
  if (isCloudinary) {
    return await cloudinary.uploader.destroy(folderName);
  } else {
    const uploadDirectory = path.join(baseDirectory, folderName);
    return await fs.unlink(uploadDirectory);
  }
};

export default unlink;
