import { Router } from "express";
import { createUser, deleteSessionCookie, setLoggedinCookie, updateUser } from "../controllers/authControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";


const router = Router()

router.post("/", createUser)
router.post("/:id", userAuthMiddleware, updateUser)
router.post("/token", userAuthMiddleware, setLoggedinCookie)
router.delete("/token", userAuthMiddleware, deleteSessionCookie)

const authRoutes = router

export default authRoutes