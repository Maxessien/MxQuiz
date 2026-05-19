import { Router } from "express";
import { multerUpload } from "../configs/fileUploadConfigs";
import { createQuiz, createQuizWithAi } from "../controllers/quizControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";
import { handleFileUpload } from "../middlewares/regMiddleware";

const router = Router();

router.post(
  "/",
  userAuthMiddleware,
  multerUpload.single("thumbnail"),
  handleFileUpload,
  createQuiz,
);

router.post(
  "/ai",
  userAuthMiddleware,
  multerUpload.any(),
  handleFileUpload,
  createQuizWithAi,
);
const quizRoutes = router;

export default quizRoutes;
