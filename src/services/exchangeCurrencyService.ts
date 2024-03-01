import {
  ExchangeRateServiceIntegration,
  exchangeRateServiceIntegration,
} from "../utils/axiosGet";
import { ErrorHandler } from "../utils/errorHandler";
import { ExchangeTransaction } from "../models/transactions/exchangeTransaction";
import { ExchangeTransactionResponse } from "../models/response/exchangeTransactionResponse";
import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { transactionRepository } from "../repositories/transactionRepository";
import { ExchangeTransactionDTO } from "../models/transactions/DTO/exchangeTransactionDTO";
import { Logger } from "../logger/logger";
import { IExchangeCurrencyService } from "./IExchangeCurrencyService";

export class CurrencyService implements IExchangeCurrencyService {
  private transactionRepository: ITransactionRepository;
  private exchangeRateFetchService: ExchangeRateServiceIntegration;

  constructor(
    transactionRepository: ITransactionRepository,
    exchangeRateFetchService: ExchangeRateServiceIntegration,
  ) {
    this.transactionRepository = transactionRepository;
    this.exchangeRateFetchService = exchangeRateFetchService;
  }

  async convertCurrency(
    data: ExchangeTransactionDTO,
  ): Promise<ExchangeTransaction> {
    const { userId, fromCurrency, toCurrency, amount } = data;
    try {
      const exchangeRate = await this.exchangeRateFetchService.getExchangeRate(
        fromCurrency,
        toCurrency,
      );
      const targetValue = amount * exchangeRate;
      return await this.transactionRepository.save({
        userId,
        sourceCurrency: fromCurrency,
        targetCurrency: toCurrency,
        sourceValue: amount,
        targetValue,
        conversionRate: exchangeRate,
        date: new Date(),
      });
    } catch (error) {
      Logger.error("Error converting currency:", error);
      throw new ErrorHandler("Error converting currency", "GENERAL");
    }
  }

  async listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionResponse[]> {
    return await this.transactionRepository.findByUserId(userId);
  }
}

export const currencyService = new CurrencyService(
  transactionRepository,
  exchangeRateServiceIntegration,
);
