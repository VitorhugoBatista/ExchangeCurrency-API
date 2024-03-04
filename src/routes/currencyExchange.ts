import { Router } from "express";
import { currencyTransactionController } from "../controllers/currencyTransaction/currencyTransactionController";
import { listConvertCurrencyController } from "../controllers/currencyTransaction/currencyTransactionController";
import { validateRequestBody } from "../middlewares/validateRequestBody";
import { validateIdParam } from "../middlewares/validateIdParam";
import { CurrencyTransactionRequest } from "../controllers/currencyTransaction/CurrencyTransactionRequest";

const router = Router();

router.post(
  "/conversions",
  validateRequestBody(CurrencyTransactionRequest),
  currencyTransactionController,
);
router.get(
  "/users/:id/conversions",
  validateIdParam,
  listConvertCurrencyController,
);

export default router;
