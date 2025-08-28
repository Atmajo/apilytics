import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        otp?: string;
        iat: number;
        exp: number;
      };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }

    const decoded = jwt.verify(token, config.jwtsecret) as {
      id: string;
      email: string;
      otp?: string;
      iat: number;
      exp: number;
    };

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
    return;
  }
};
