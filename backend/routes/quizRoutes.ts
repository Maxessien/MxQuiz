import { Router } from "express";
import { multerUpload } from "../configs/fileUploadConfigs";
import {
  createQuiz,
  createQuizWithAi,
  getPrivateQuizDetails,
  getPublicQuizDetails,
  getPublicQuizzes,
  getUserQuizzes,
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

router.get("/", getPublicQuizzes);

router.get("/user", userAuthMiddleware, getUserQuizzes);

router.get("/:id", getPublicQuizDetails);
router.get("/private/:id", userAuthMiddleware, getPrivateQuizDetails);

const quizRoutes = router;

export default quizRoutes;
