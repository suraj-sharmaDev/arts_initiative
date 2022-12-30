import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";

const baseDirectory = path.join(process.cwd(), "/public/uploads");

const upload = async (file: formidable.File, folderName: string) => {
  const uploadDirectory = path.join(baseDirectory, folderName);
  try {
    await fs.access(uploadDirectory);
  } catch (error) {
    await fs.mkdir(uploadDirectory, { recursive: true });
  }

  const tempPath = file.filepath;
  await fs.cp(tempPath, uploadDirectory + "/" + file.originalFilename);
  await fs.unlink(tempPath);
  return true;
};

export default upload;
