import type { RequestHandler } from "express";
import { z } from "zod";

type RequestSource = "body" | "params" | "query";

export const zodValidator = (
  schema: z.ZodTypeAny,
  property: RequestSource,
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (result.success) {
      return next();
    } else {
      const message = result.error.issues.map((e) => e.message).join(", ");

      return res.status(500).json({ error: { message } });
    }
  };
};
