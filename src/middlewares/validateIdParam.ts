import { NextFunction, Request, Response } from "express";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "ID must be an integer" });
  }

  next();
};
