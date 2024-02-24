import { Request, Response } from 'express';
import { listTransactions } from '../services/exchangeCurrencyService';

/**
 *Return a list of transactions by user ID.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 */
export const listConvertCurrencyController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber) || userIdNumber <= 0) {
            return res.status(400).json({ error: 'Invalid userId. UserId must be a positive number.' });
        }

        const listTransactionsbyUserId = await listTransactions(userIdNumber);

        if (listTransactionsbyUserId.length === 0) {
            return res.status(404).json({ error: 'No transactions found for the given userId.' });
        }

        res.json({ transactions: listTransactionsbyUserId });
    } catch (error) {
        console.error('Error listing transactions:', error);
        res.status(500).json({ error: 'Error listing transactions.' });
    }
};