import { config } from "@/config/config";
import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginData } from "types";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginData;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return CResponse.error("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return CResponse.error("Invalid password", 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtsecret, {
      expiresIn: "30D",
    });

    return CResponse.success({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return CResponse.error("Login failed", 500);
  }
};
