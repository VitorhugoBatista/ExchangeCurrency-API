import { convertCurrency, listTransactions } from '../services/exchangeCurrencyService';
import * as utils from '../utils/axiosGet';
import { transactionRepository } from '../repositories/transactionRepository';
import { ErrorHandler } from '../utils/errorHandler';

jest.mock('../utils/axiosGet');
jest.mock('../repositories/transactionRepository');

process.env.API_EXCHANGE_URL = 'https://api.exchangerate-api.com';
process.env.EXCHANGE_RATE_API_KEY = 'test_api_key';

describe('convertCurrency', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('converts currency successfully', async () => {
    (utils.axiosGet as jest.Mock).mockResolvedValueOnce({
      data: { rates: { EUR: 0.85 } }
    });

    const mockCreate = jest.fn().mockImplementation((data) => data);
    const mockSave = jest.fn().mockImplementation(async (data) => data);
    (transactionRepository.create as jest.Mock) = mockCreate;
    (transactionRepository.save as jest.Mock) = mockSave;

    const result = await convertCurrency(100, 'USD', 'EUR', 1);

    expect(result).toHaveProperty('sourceCurrency', 'USD');
    expect(result).toHaveProperty('targetCurrency', 'EUR');
    expect(result).toHaveProperty('sourceValue', 100);
    expect(result).toHaveProperty('targetValue', 85);
    expect(utils.axiosGet).toHaveBeenCalledWith(expect.any(String), 'test_api_key');
  });

  it('throws error if API key is not defined', async () => {

    await expect(convertCurrency(100, 'USD', 'EUR', 1)).rejects.toThrow(ErrorHandler);
  });
});

describe('listTransactions', () => {
  it('lists transactions for a user', async () => {
    const mockTransactions = [
      { userId: 1, sourceCurrency: 'USD', targetCurrency: 'EUR', sourceValue: 100, targetValue: 85 }
    ];
    (transactionRepository.find as jest.Mock).mockResolvedValueOnce(mockTransactions);

    const result = await listTransactions(1);

    expect(result).toEqual(mockTransactions);
    expect(transactionRepository.find).toHaveBeenCalledWith({ where: { userId: 1 } });
  });
});