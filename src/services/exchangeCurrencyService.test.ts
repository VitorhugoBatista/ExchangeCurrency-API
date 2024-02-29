import {CurrencyService, currencyService } from './exchangeCurrencyService'; 
import { ExchangeTransactionDTO } from '../models/transactions/DTO/exchangeTransactionDTO';

// 
jest.mock("../repositories/transactionRepository", () => ({
  transactionRepository: {
    save: jest.fn(),
    findByUserId: jest.fn()
  }
}));

jest.mock("../utils/axiosGet", () => ({
  exchangeRateServiceIntegration: {
    getExchangeRate: jest.fn()
  }
}));

describe('CurrencyService', () => {
  const mockedTransactionRepository = require("../repositories/transactionRepository").transactionRepository;
  const mockedExchangeRateService = require("../utils/axiosGet").exchangeRateServiceIntegration;

  beforeEach(() => {
    let currencyService = new CurrencyService(mockedTransactionRepository, mockedExchangeRateService);
    jest.clearAllMocks(); 
  });

  it('should convert currency correctly', async () => {
    const dto: ExchangeTransactionDTO = {
      userId: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100
    };

    const expectedRate = 0.85;
    const expectedTransaction = {
      userId: dto.userId,
      sourceCurrency: dto.fromCurrency,
      targetCurrency: dto.toCurrency,
      sourceValue: dto.amount,
      targetValue: dto.amount * expectedRate,
      conversionRate: expectedRate,
      date: expect.any(Date),
    };

    mockedExchangeRateService.getExchangeRate.mockResolvedValue(expectedRate);
    mockedTransactionRepository.save.mockResolvedValue(expectedTransaction);

    const result = await currencyService.convertCurrency(dto);
console.log(result, expectedTransaction);
    expect(result).toEqual(expectedTransaction);
    expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(dto.fromCurrency, dto.toCurrency);
    expect(mockedTransactionRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      userId: dto.userId,
      sourceCurrency: dto.fromCurrency,
      targetCurrency: dto.toCurrency,
      sourceValue: dto.amount,
      targetValue: dto.amount * expectedRate,
      conversionRate: expectedRate,
    }));
  });

});