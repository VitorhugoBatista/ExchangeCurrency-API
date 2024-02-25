import { axiosGet } from "../utils/axiosGet";
import { Currency } from "../types/currencyTypes";
import { ErrorHandler } from "../utils/errorHandler";
import { ExchangeTransaction } from '../entities/exchangeTransaction';
import { transactionRepository } from '../repositories/transactionRepository';
/**
 * Converts a value between currencies using the ExchangeRate-API.
 * 
 * @param {number} amount - The value to be converted.
 * @param {Currency} fromCurrency - The source currency.
 * @param {Currency} toCurrency - The target currency.
 * @returns {Promise<ExchangeTransaction>} - The converted value in the target currency.
 */
export const convertCurrency = async (amount: number, fromCurrency: Currency, toCurrency: Currency, userId: number): Promise<ExchangeTransaction> => {
    const apiUrl = process.env.API_EXCHANGE_URL;
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    if (!apiKey) {
        throw new ErrorHandler('API key is not defined', 'GENERAL');
    }
    const url = `${apiUrl}/latest?symbols=${toCurrency}&base=${fromCurrency}`;
    try {
        const response = await axiosGet(url, apiKey);
        const rates = response.data.rates;

        if (!rates[toCurrency]) {
            throw new ErrorHandler('Currency not found', 'NOT_FOUND');
        }
        const convertedAmount = amount * rates[toCurrency];
        const newTransaction = transactionRepository.create({
            userId: userId,
            sourceCurrency: fromCurrency,
            targetCurrency: toCurrency,
            sourceValue: amount,
            targetValue: convertedAmount,
            conversionRate: rates[toCurrency],
            date: new Date(),
        });
        await transactionRepository.save(newTransaction);
        return newTransaction;
    } catch (error) {
        console.error('Error converting currency:', error);
        throw new ErrorHandler('Error converting currency', 'GENERAL');
    }
};
export const listTransactions = async (userId: number): Promise<ExchangeTransaction[]> => {
    return await transactionRepository.find({
        where: {
            userId: userId
        }
    });
};
