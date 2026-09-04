import type { NextFunction, Request, Response } from "express";

import type { ZodType } from "zod";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validate(schemas: RequestSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = {
      body: schemas.body?.safeParse(req.body),
      params: schemas.params?.safeParse(req.params),
      query: schemas.query?.safeParse(req.query),
    };

    const validationErrors: Record<string, unknown> = {};

    if (result.body && !result.body.success) {
      validationErrors.body = result.body.error.flatten();
    }

    if (result.params && !result.params.success) {
      validationErrors.params = result.params.error.flatten();
    }

    if (result.query && !result.query.success) {
      validationErrors.query = result.query.error.flatten();
    }

    if (Object.keys(validationErrors).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });

      return;
    }

    if (result.body?.success) {
      req.body = result.body.data;
    }

    if (result.params?.success) {
      req.params = result.params.data as typeof req.params;
    }

    if (result.query?.success) {
      Object.assign(req.query, result.query.data);
    }

    next();
  };
}
