import { Router } from 'express';
import { convertCurrencyController } from '../controllers/currencyController';
import { listConvertCurrencyController } from '../controllers/listCurrencyController';

const router = Router();

router.get('/list/:userId', listConvertCurrencyController);

router.post('/', convertCurrencyController);

export default router;