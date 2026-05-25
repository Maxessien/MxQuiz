import { Request, Response } from "express";
import { UserRecord } from "firebase-admin/auth";
import { PoolClient } from "pg";
import { auth } from "../configs/fbConfigs.js";
import pool from "../configs/sqlConfig.js";
import { CLIENT_ERROR, SERVER_ERROR, SUCCESS } from "../utils/httpCodes.js";
import logger from "../utils/logger.js";
import { CreateUserReqBody } from "../utils/types.js";


const createUser = async (req: Request, res: Response) => {
  let user: UserRecord | null = null
  try {
    const { email, name, password } = req.body as CreateUserReqBody;
    if (!email || !name || !password)
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "Incomplete form" });

    user = await auth.createUser({ email, password, displayName: name });
    auth.setCustomUserClaims(user.uid, { role: "user" });

    const query = `INSERT INTO users (name, email, role, user_id) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [name, email, "user", user.uid]);

    return res.status(SUCCESS.CREATED).json({ message: "User created" });
  } catch (err) {
    logger.log("Create user", err);
    if (user?.uid) await auth.deleteUser(user.uid)
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await pool.query(
      "SELECT user_id, name, email, role, avatar_url FROM users WHERE user_id=$1",
      [req.auth?.uid],
    );
    if (!user.rows?.[0]) return res.status(CLIENT_ERROR.NOT_FOUND).json({message: "User not found"})
    return res.status(SUCCESS.OK).json(user.rows?.[0]);
  } catch (err) {
    logger.log("Get user", err);
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  let user: UserRecord;
  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const { email, name, password } = req.body;
    if (!name?.trim() || !email?.trim() || !req.auth?.uid)
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "Bad request" });

    const query = `UPDATE users SET name=$1, email=$2 WHERE user_id=$3`;
    await client.query<{ user_id: string }>(query, [
      name,
      email,
      req.auth?.uid,
    ]);

    user = await auth.updateUser(req.auth?.uid || "", {
      email,
      displayName: name,
      ...(password ? { password } : {}),
    });

    if (!user) throw new Error("Couldn't update user");
    await client.query("COMMIT");
    res.status(SUCCESS.OK).json({ message: "User updated" });
  } catch (err) {
    if (client) await client.query("ROLLBACK");
    logger.error("Update user error", err);
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    if (client) client.release();
  }
};

export { createUser, getUser, updateUser };

