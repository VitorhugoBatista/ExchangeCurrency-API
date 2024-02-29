import { Router } from 'express';
import { convertCurrencyController } from '../controllers/currencyController';
import { listConvertCurrencyController } from '../controllers/currencyController';
import { convertCurrencyValidation } from '../middlewares/convertCurrencyMiddleware';
import { listTransactionsValidation } from '../middlewares/listTransactionByUserMiddleware';

const router = Router();

router.post('/conversions', convertCurrencyValidation, convertCurrencyController);
router.get('/user/:userId/conversions', listTransactionsValidation, listConvertCurrencyController);

export default router;