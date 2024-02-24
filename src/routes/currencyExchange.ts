import { Router } from 'express';
import { convertCurrencyController } from '../controllers/currencyController';
import { listConvertCurrencyController } from '../controllers/listCurrencyController';

const router = Router();
/**
 * @swagger
 * /v1/currencyexchange/list/{userId}:
 *   get:
 *     summary: Lists currency conversions by user
 *     tags: [Conversions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of currency conversions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sourceCurrency:
 *                     type: string
 *                   targetCurrency:
 *                     type: string
 *                   sourceValue:
 *                     type: number
 *                   targetValue:
 *                     type: number
 *                   conversionRate:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 */

router.get('/list/:userId', listConvertCurrencyController);

/**
 * @swagger
 * /v1/currencyexchange/:
 *   post:
 *     summary: Converts values from one currency to another
 *     tags: [Conversions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               fromCurrency:
 *                 type: string
 *               toCurrency:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Conversion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 sourceCurrency:
 *                   type: string
 *                 targetCurrency:
 *                   type: string
 *                 sourceValue:
 *                   type: number
 *                 targetValue:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 conversionRate:
 *                   type: number
 *                 id:
 *                   type: integer
 */
router.post('/', convertCurrencyController);

export default router;