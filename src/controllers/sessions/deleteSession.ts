import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { Request, Response } from "express";

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;

    await prisma.sessions.deleteMany({
      where: { id: sessionId, userId },
    });

    return CResponse.success(res, "Session deleted successfully");
  } catch (error) {
    console.log(error);
    return CResponse.error(res, "Failed to delete session", 500);
  }
};
