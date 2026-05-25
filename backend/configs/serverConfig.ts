import { config } from "dotenv";
config();

import express from "express";
import rateLimiter from "express-rate-limit";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.set('trust proxy', 1); 

app.use(
  rateLimiter({
    limit: 100,
    windowMs: 5 * 60 * 1000,
  }),
);

export default app
