import { promises as fs } from "fs";
import path from "path";

const baseDirectory = path.join(process.cwd(), "/public");

const unlink = async (folderName: string) => {
  const uploadDirectory = path.join(baseDirectory, folderName);
  try {
    await fs.access(uploadDirectory);
  } catch (error) {
    throw error;
  }
  return await fs.unlink(uploadDirectory);
};

export default unlink;
