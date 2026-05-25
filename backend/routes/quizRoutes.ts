import { Router } from "express";
import { multerUpload } from "../configs/fileUploadConfigs";
import {
  createQuiz,
  createQuizWithAi,
  deleteQuiz,
  getPrivateQuizDetails,
  getPublicQuizDetails,
  getQuizzes,
} from "../controllers/quizControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";
import { handleFileUpload } from "../middlewares/regMiddleware";

const router = Router();

router.post("/", userAuthMiddleware, createQuiz);

router.post(
  "/ai",
  userAuthMiddleware,
  multerUpload.any(),
  handleFileUpload,
  createQuizWithAi,
);

router.get("/", getQuizzes);

router.get("/:id", getPublicQuizDetails);

router.delete("/:id", userAuthMiddleware, deleteQuiz);

router.get("/private/:id", userAuthMiddleware, getPrivateQuizDetails);

const quizRoutes = router;

export default quizRoutes;
