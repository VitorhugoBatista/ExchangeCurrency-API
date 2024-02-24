import { Request, Response } from 'express';
import { convertCurrency } from '../services/exchangeCurrencyService';
import { Currency } from '../types/currencyTypes'; 

/**
 * Controller for converting currencies.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const convertCurrencyController = async (req: Request, res: Response) => {
  try {
    const { amount, fromCurrency, toCurrency, userId } = req.body;
    
    const supportedCurrencies: Currency[] = ['USD', 'EUR', 'BRL', 'JPY']; 

    if (!amount || !fromCurrency || !toCurrency || !userId) {
      return res.status(400).json({ error: 'All parameters (amount, fromCurrency, toCurrency, userId) are required.' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Amount must be a positive number.' });
    }

    if (!supportedCurrencies.includes(fromCurrency) || !supportedCurrencies.includes(toCurrency)) {
      return res.status(400).json({ error: 'Unsupported currency. Please use one of the supported currencies.' });
    }

    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      return res.status(400).json({ error: 'Invalid userId. UserId must be a positive number.' });
    }

    const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency, userIdNumber);

    res.json({ convertedAmount });
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ error: 'Error converting currency.' });
  }
};