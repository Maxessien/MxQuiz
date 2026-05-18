import { config } from "dotenv";
import {} from "multer";
config();

import app from "./configs/serverConfig.js";
import logger from "./utils/logger.js";
import { DecodedIdToken } from "firebase-admin/auth";

interface DecodedTokenWithClaims extends DecodedIdToken {
  role: "user" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      auth: DecodedTokenWithClaims;
      images: { url: string; publicId: string }[];
      file?: Multer.File;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
    }
  }
}

const PORT = process.env.PORT || 5050;

app.listen(Number(PORT), "0.0.0.0", () => {
  logger.info("App listening on", PORT);
});
