import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "9f9c9d5a8d6e5f6d6e5f6d6e5f6d6e5f6d6e5f6")

    return next();
  } catch (error) {
    return response.status(401).json({
      errorCode: "token.invalid",
      message: "Token invalid",
    });
  }
}