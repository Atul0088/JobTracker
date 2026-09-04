import type { Request, Response } from "express";

import type { TestBody } from "../schemas/test.schema.js";

export function testValidation(
  req: Request<Record<string, never>, unknown, TestBody>,
  res: Response,
): void {
  res.status(200).json({
    success: true,
    message: "Validation successful",
    data: req.body,
  });
}
