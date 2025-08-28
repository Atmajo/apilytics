import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { Request, Response } from "express";

export const verify = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.user;

    if (!email) {
      return CResponse.error(res, "Email is required");
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return CResponse.error(res, "User not found");
    }

    const isValid = otp === user.otp;

    if (!isValid) {
      return CResponse.error(res, "Invalid OTP");
    }

    await prisma.users.update({
      where: { email },
      data: { otp: null, isVerified: true },
    });

    return CResponse.success(res, "Verification successful");
  } catch (error) {
    console.log(error);
    return CResponse.error(res, "Verification failed");
  }
};
