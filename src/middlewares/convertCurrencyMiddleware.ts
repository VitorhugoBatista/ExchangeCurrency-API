import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { Currency } from '../types/currencyTypes';

export const convertCurrencyValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    fromCurrency: Joi.string().valid(...Object.values(Currency)).required(),
    toCurrency: Joi.string().valid(...Object.values(Currency)).required(),
    userId: Joi.number().positive().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};