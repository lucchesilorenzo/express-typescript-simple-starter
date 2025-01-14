import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./lib/env";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: env.APP_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, from Express!");
});

export default app;
