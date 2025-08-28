import { Request, Response, Router } from "express";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { getClientIp } from "request-ip";
import { authRouter } from "./authRouter";
import { apiRouter } from "./apiRouter";

const router = Router();

router.get("/", apiRouter);

router.get("/logs", (req: Request, res: Response) => {
  try {
    const logFilePath = join(process.cwd(), "logs", "combined.log");

    if (!existsSync(logFilePath)) {
      res.status(404).send("Log file not found");
      return;
    }

    const logContent = readFileSync(logFilePath, "utf8");
    res.setHeader("Content-Type", "text/plain");
    res.send(logContent);
  } catch (error) {
    console.error(`Error reading log file: ${error}`);
    res.status(500).send("Error reading log file");
  }
});

router.use("/auth", authRouter);

export { router as indexRouter };
