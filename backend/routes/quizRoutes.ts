import { Router } from "express";
import { multerUpload } from "../configs/fileUploadConfigs";
import { createQuiz, createQuizWithAi, getPublicQuizzes, getUserQuizzes } from "../controllers/quizControllers";
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

router.get("/", getPublicQuizzes)

router.get("/:id", userAuthMiddleware, getUserQuizzes)

const quizRoutes = router;

export default quizRoutes;
