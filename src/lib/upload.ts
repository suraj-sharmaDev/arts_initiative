import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";
import { createRandomString, extractFileExt } from "./commons";

const baseDirectory = path.join(process.cwd(), "/public/uploads");

const upload = async (file: formidable.File, folderName: string) => {
  const uploadDirectory = path.join(baseDirectory, folderName);
  try {
    await fs.access(uploadDirectory);
  } catch (error) {
    await fs.mkdir(uploadDirectory, { recursive: true });
  }

  const tempPath = file.filepath;
  const newFilename =
    createRandomString(8) + "." + extractFileExt(file.originalFilename);
  await fs.cp(tempPath, uploadDirectory + "/" + newFilename);
  await fs.unlink(tempPath);
  return "uploads/" + folderName + "/" + newFilename;
};

export default upload;
