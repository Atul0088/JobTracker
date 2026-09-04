import { z } from "zod";

export const testBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().trim().email("Please provide a valid email address"),

  age: z
    .number()
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(100, "Age cannot exceed 100"),
});

export const testQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const testParamsSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type TestBody = z.infer<typeof testBodySchema>;
