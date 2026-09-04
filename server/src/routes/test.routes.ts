import { Router } from "express";

import { validate } from "../middleware/validate.middleware.js";
import { testBodySchema } from "../schemas/test.schema.js";
import { testValidation } from "../controllers/test.controller.js";

const router = Router();

router.post(
  "/",
  validate({
    body: testBodySchema,
  }),
  testValidation,
);

export default router;
