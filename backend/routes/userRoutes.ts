import { Router } from "express";
import { getAttemptDetails, getUserAttempts, getUserDashboardStats } from "../controllers/userControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router()

router.use(userAuthMiddleware)

router.get("/dashboard", getUserDashboardStats)
router.get("/attempts", getUserAttempts)
router.get("/attempts/:id", getAttemptDetails)

const userRoutes = router

export default userRoutes