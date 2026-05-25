import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/authControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";


const router = Router()

router.get("/", userAuthMiddleware, getUser)
router.post("/", createUser)
router.post("/:id", userAuthMiddleware, updateUser)

const authRoutes = router

export default authRoutes