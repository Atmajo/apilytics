import { sessions } from "@/controllers/auth/sessions";
import { verifyToken } from "@/middlewares/token";
import { Router } from "express";

const router = Router();

router.post("/sessions", verifyToken, sessions);

export { router as apiRouter };
