import formidable from "formidable";
import { promises as fs } from "fs";
import cloudinary from "./cloudinary";
import env from "./env";

const upload = async (file: formidable.File) => {
  // temp path for uploaded file
  const tempPath = file.filepath;
  const result = await cloudinary.uploader.upload(tempPath, {
    unique_filename: true,
    upload_preset: env.cloudinary.uploadPreset,
  });

  // delete temp upload file
  await fs.unlink(tempPath).catch((err) => console.log(err));

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

export default upload;
