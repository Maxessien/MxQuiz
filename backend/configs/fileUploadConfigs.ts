import {v2 as cloudinary} from "cloudinary";
// import { offlineCloudinary } from "offline-cloudinary"
import { IS_DEVELOPMENT } from '../utils/regHelpers.js';
import multer from "multer";
import { join } from "path";

// const offlineCl = offlineCloudinary

const uploader = cloudinary.uploader

const storage = multer.diskStorage({destination: join(process.cwd(), "uploads")})

const multerUpload = multer({
    storage
})

export {uploader, multerUpload}