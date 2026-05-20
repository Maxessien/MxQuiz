import { Router } from "express";
import { getPrivateQuizQuestions, getPublicQuizQuestions, gradeQuestionAnswers } from "../controllers/questionsControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";


const router = Router()

router.get("/:id", getPublicQuizQuestions)
router.get("/private/:id", userAuthMiddleware, getPrivateQuizQuestions)
router.post("/grade", gradeQuestionAnswers)

const questionsRoutes = router

export default questionsRoutes