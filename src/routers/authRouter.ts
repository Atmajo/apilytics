import { register } from "@/controllers/auth/register";
import { Router } from "express";
import { login } from "@/controllers/auth/login";
import { verify } from "@/controllers/auth/verify";
import { verifyToken } from "@/middlewares/token";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken, verify);

export { router as authRouter };
