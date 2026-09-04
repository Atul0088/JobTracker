import express from "express";
import cors from "cors";
import helmet from "helmet";
import testRouter from "./routes/test.routes.js";

import healthRouter from "./routes/health.routes.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/health", healthRouter);

app.use("/api/v1/test", testRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
