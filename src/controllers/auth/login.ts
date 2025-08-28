import { config } from "@/config/config";
import { prisma } from "@/lib/prisma";
import { CResponse } from "@/lib/response";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginData } from "types";
import { getClientIp } from "request-ip";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginData;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return CResponse.error(res, "User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return CResponse.error(res, "Invalid password", 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtsecret, {
      expiresIn: "30D",
    });

    const ip = getClientIp(req);

    const ipLocation = (await fetch(
      `https://api.iplocation.net/?ip=${ip}`
    ).then((response) => response.json())) as {
      ip: string;
      ip_number: number;
      ip_version: number;
      country_name: string;
      country_code2: string;
    };

    if (ip && ipLocation) {
      await prisma.sessions.create({
        data: {
          userId: user.id,
          ipAddress: ip,
          location: ipLocation.country_name,
          userAgent: req.headers["user-agent"] || "Unknown",
        },
      });
    }

    return CResponse.success(res, { message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return CResponse.error(res, "Login failed", 500);
  }
};
