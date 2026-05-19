import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { CreateUserReqBody } from "../utils/types.js";
import { auth } from "../configs/fbConfigs.js";
import pool from "../configs/sqlConfig.js";
import { CLIENT_ERROR, SERVER_ERROR, SUCCESS } from "../utils/httpCodes.js";
import { IS_DEVELOPMENT, SESSION_COOKIE_NAME } from "../utils/regHelpers.js";
import { PoolClient } from "pg";
import { UserRecord } from "firebase-admin/auth";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body as CreateUserReqBody;
    if (!email || !name || !password)
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "Incomplete form" });

    const user = await auth.createUser({ email, password, displayName: name });
    auth.setCustomUserClaims(user.uid, { role: "user" });

    const query = `INSERT INTO users (name, email, role, user_id) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [name, email, "user", user.uid]);

    return res.status(SUCCESS.CREATED).json({ message: "User created" });
  } catch (err) {
    logger.log("Create user", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

const setLoggedinCookie = async (req: Request, res: Response) => {
  try {
    const token = req.body.token as string;
    if (!token.trim())
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "No token found" });

    res.cookie(SESSION_COOKIE_NAME, token, {
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
      secure: !IS_DEVELOPMENT,
      httpOnly: !IS_DEVELOPMENT,
    });

    return res.status(SUCCESS.OK);
  } catch (err) {
    logger.log("Set logged in", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

const deleteSessionCookie = async (req: Request, res: Response) => {
  try {
    res.cookie(SESSION_COOKIE_NAME, null, {
      maxAge: 0,
      sameSite: "none",
      httpOnly: !IS_DEVELOPMENT,
      secure: !IS_DEVELOPMENT,
    });

    return res.status(SUCCESS.OK)
  } catch (err) {
    logger.log("delete cookie", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

const updateUser = async (req: Request, res: Response) => {
  let user: UserRecord;
  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    client.query("BEGIN");

    const { email, name, password } = req.body;
    if (!name?.trim() || !email?.trim() || !req.auth?.uid) return res.status(CLIENT_ERROR.BAD_REQUEST);

    const query = `UPDATE users SET name=$1, email=$2 WHERE user_id=$3`;
    await client.query<{ user_id: string }>(query, [name, email, req.auth?.uid]);

    user = await auth.updateUser(req.auth?.uid || "", {
      email,
      displayName: name,
      ...(password ? { password } : {}),
    });

    if (!user) throw new Error("Couldn't create user")

    client.query("COMMIT");
  } catch (err) {
    if (client) client.query("ROLLBACK");
    logger.error("Update user error", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }finally{
    if (client) client.release()
  }
};

export { createUser, setLoggedinCookie, deleteSessionCookie, updateUser };
