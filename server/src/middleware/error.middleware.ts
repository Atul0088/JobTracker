import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(env.NODE_ENV === "development" && {
      error: error instanceof Error ? error.message : "Unknown error",
    }),
  });
};
