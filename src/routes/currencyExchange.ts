import { Router } from "express";
import { currencyTransactionController } from "../controllers/currencyTransaction/currencyTransactionController";
import { listConvertCurrencyController } from "../controllers/currencyTransaction/currencyTransactionController";
import { convertCurrencyValidation } from "../middlewares/convertCurrencyMiddleware";
import { listTransactionsValidation } from "../middlewares/listTransactionByUserMiddleware";

const router = Router();

router.post(
  "/conversions",
  convertCurrencyValidation,
  currencyTransactionController,
);
router.get(
  "/users/:userId/conversions",
  listTransactionsValidation,
  listConvertCurrencyController,
);

export default router;
