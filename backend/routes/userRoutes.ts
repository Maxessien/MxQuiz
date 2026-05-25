import { Router } from "express";
import { getAttemptDetails, getUserAttempts } from "../controllers/userControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router()

router.use(userAuthMiddleware)

router.get("/attempts", getUserAttempts)
router.get("/attempts/:id", getAttemptDetails)

const userRoutes = router

export default userRoutes