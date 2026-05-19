import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";
import { auth } from "../configs/fbConfigs.js";
import { DecodedTokenWithClaims } from "../utils/types.js";
import { CLIENT_ERROR } from "../utils/httpCodes.js";

const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    const hasBearer = header?.startsWith("Bearer ");
    if (!hasBearer) throw new Error("Unrecongnised header");
    const token = header?.slice(7);
    if (!token) throw new Error("Token missing");
    const decoded = await auth.verifyIdToken(token);
    req.auth = decoded as DecodedTokenWithClaims;
    next();
  } catch (err) {
    logger.error("User auth middleware", err);
    return res.status(CLIENT_ERROR.UNAUTHORIZED).json({ message: "Not Authorised" });
  }
};

const verifAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.auth) throw new Error("Account not checked");
    if (req.auth.role !== "admin") throw new Error("Not an Admin");
    next();
  } catch (err) {
    logger.error("Verify admin middleware", err);
    return res.status(CLIENT_ERROR.UNAUTHORIZED).json({ message: "Not an Admin" });
  }
};

export { userAuthMiddleware, verifAdmin };
