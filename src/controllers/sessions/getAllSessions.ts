import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { Request, Response } from "express";

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const sessions = await prisma.sessions.findMany({
      where: { userId },
    });

    return CResponse.success(res, sessions);
  } catch (error) {
    console.log(error);
    return CResponse.error(res, "Failed to retrieve user sessions", 500);
  }
};
