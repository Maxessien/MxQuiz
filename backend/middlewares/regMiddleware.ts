import { NextFunction, Request, Response } from "express";
import { } from "multer";
import {uploader} from "../configs/fileUploadConfigs";
import { CLIENT_ERROR, SERVER_ERROR } from "../utils/httpCodes";
import logger from "../utils/logger";
import { RequestImages } from "../utils/types";

const handleFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let uploads: RequestImages[] = [];
    if (!req.file || !req.files)
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "No file found" });

    if (req.file) {
      const res = await uploader.upload(req.file.path, {});
      uploads.push({ publicId: res.public_id, url: res.secure_url, ...req.file });
    }

    if (req.files) {
      const image: RequestImages[] = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const res = await uploader.upload(file.path, {});
          return { url: res.secure_url, publicId: res.public_id, ...file };
        }),
      );
      uploads = [...image, ...uploads];
    }

    req.uploaded = uploads;
    next();
  } catch (err) {
    logger.error("File upload", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

export { handleFileUpload };

