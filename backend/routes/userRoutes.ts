import { Router } from "express";
import { getUserAttempts } from "../controllers/userControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router()

router.use(userAuthMiddleware)

router.get("/attempts", getUserAttempts)

const userRoutes = router

export default userRoutes