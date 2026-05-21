import { Router } from "express";
import { createUser, deleteSessionCookie, getUser, setLoggedinCookie, updateUser } from "../controllers/authControllers";
import { userAuthMiddleware } from "../middlewares/authMiddleware";


const router = Router()

router.get("/", userAuthMiddleware, getUser)
router.post("/", createUser)
router.post("/token", userAuthMiddleware, setLoggedinCookie)
router.delete("/token", deleteSessionCookie)
router.post("/:id", userAuthMiddleware, updateUser)

const authRoutes = router

export default authRoutes