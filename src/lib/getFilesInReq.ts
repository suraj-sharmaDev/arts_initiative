import formidable, { File, Fields } from "formidable";
import { NextApiRequest } from "next";

type ReturnValues = {
  err: any;
  fields: formidable.Fields;
  files: formidable.Files;
};

const getFilesInReq = async (req: NextApiRequest) => {
  return new Promise<ReturnValues>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err, fields, files });
        return;
      }
      resolve({ err, fields, files });
      return;
    });
  }).catch((err: any) => {
    console.log(err);
    return { err, fields: null, files: null };
  });
};

export default getFilesInReq;
