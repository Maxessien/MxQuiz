import { config } from "dotenv";
config();

import {} from "multer";
import app from "./configs/serverConfig.js";
import logger from "./utils/logger.js";
import { DecodedTokenWithClaims, RequestImages } from "./utils/types.js";
import authRoutes from "./routes/authRoutes.js";
import { IS_DEVELOPMENT } from "./utils/regHelpers.js";
import { startEmulator } from "offline-cloudinary";
import quizRoutes from "./routes/quizRoutes.js";

declare global {
  namespace Express {
    interface Request {
      auth?: DecodedTokenWithClaims;
      uploaded?: RequestImages[];
      file?: Multer.File;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
    }
  }
}

app.use("/auth", authRoutes)
app.use("/quiz", quizRoutes)

const PORT = process.env.PORT || 5050;

app.listen(Number(PORT), "0.0.0.0", async() => {
  if (IS_DEVELOPMENT) await startEmulator()
  logger.info("App listening on", PORT);
});
