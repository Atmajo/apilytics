import { config } from "@/config/config";
import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { generateOtp } from "@/lib/utils";
import { sendVerifyMail } from "@/mails/sendVerifyMail";
import { Request, Response } from "express";
import { RegisterData } from "types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body as RegisterData;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return CResponse.error("User already exists", 409);
    }

    const otp = generateOtp();

    const newUser = await prisma.users.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(password, 10),
        otp: otp,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      otp: otp,
    };

    const token = jwt.sign(payload, config.jwtsecret, {
      expiresIn: "5M",
    });

    const link = `${config.frontendUrl}/auth/verify?token=${token}`;
    await sendVerifyMail(newUser.email, link);

    return CResponse.success({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return CResponse.error("Registration failed", 500);
  }
};
