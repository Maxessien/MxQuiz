import { config } from "dotenv";
config();

import {} from "multer";
// import { startEmulator } from "offline-cloudinary";
import app from "./configs/serverConfig.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import { createAllTables } from "./utils/createTables.js";
import logger from "./utils/logger.js";
import { DecodedTokenWithClaims, RequestImages } from "./utils/types.js";
import questionsRoutes from "./routes/questionsRoutes.js";

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

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/questions", questionsRoutes);

try {
  await createAllTables();
} catch (error) {
  logger.error("Failed to initialize database tables:", error);
  process.exit(1);
}
const PORT = process.env.PORT || 5050;

app.listen(Number(PORT), "0.0.0.0", async () => {
  logger.info("App listening on", PORT);
  // if (IS_DEVELOPMENT) await startEmulator();
});
