import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/authMiddleware";
import { createQuiz, createQuizWithAi } from "../controllers/quizControllers";
import { multerUpload } from "../configs/fileUploadConfigs";
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
  multerUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  handleFileUpload,
  createQuizWithAi,
);

const quizRoutes = router;

export default quizRoutes;
