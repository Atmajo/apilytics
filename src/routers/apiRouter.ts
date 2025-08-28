import { verifyToken } from "@/middlewares/token";
import { getAllSessions } from "@/controllers/sessions/getAllSessions";
import { Router } from "express";
import { deleteSession } from "@/controllers/sessions/deleteSession";

const router = Router();

router.post("/sessions", verifyToken, getAllSessions);
router.delete("/sessions/:id", verifyToken, deleteSession);

export { router as apiRouter };
