import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateRequestBody(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(dtoClass, req.body);

    const errors = await validate(input, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) =>
        Object.values(error.constraints ?? {}),
      );
      return res.status(400).json({ errors: errorMessages });
    }

    req.body = input;
    next();
  };
}
