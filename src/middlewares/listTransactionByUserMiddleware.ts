import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const listTransactionsValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    userId: Joi.number().positive().required(),
  });

  const { error } = schema.validate({ userId: req.params.userId });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
