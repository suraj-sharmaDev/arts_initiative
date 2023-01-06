import { promises as fs } from "fs";
import path from "path";

const baseDirectory = path.join(process.cwd(), "/public");

const unlink = async (folderName: string) => {
  const uploadDirectory = path.join(baseDirectory, folderName);
  return await fs.unlink(uploadDirectory);
};

export default unlink;
