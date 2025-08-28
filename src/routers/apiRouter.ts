import { verifyToken } from "@/middlewares/token";
import { sessions } from "@/controllers/sessions/sessions";
import { Router } from "express";

const router = Router();

router.post("/sessions", verifyToken, sessions);

export { router as apiRouter };
