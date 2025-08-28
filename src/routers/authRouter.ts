import { register } from "@/controllers/auth/register";
import { Router } from "express";
import { login } from "@/controllers/auth/login";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export { router as authRouter };
