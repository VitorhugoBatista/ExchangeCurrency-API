import {
  ExchangeRateServiceIntegration,
  exchangeRateServiceIntegration,
} from "../infra/axiosGet";
import { ErrorHandler } from "../infra/errorHandler";
import { Logger } from "../logger/logger";
import { ExchangeTransactionEntity } from "../models/CurrencyTransactionEntity";
import { ITransactionRepository } from "../repositories/ICurrencyTransactionRepository";
import { transactionRepository } from "../repositories/CurrencyTransactionRepository";
import { IExchangeCurrencyService } from "./IExchangeCurrencyService";

export class CurrencyTransactionService implements IExchangeCurrencyService {
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
    entity: ExchangeTransactionEntity,
  ): Promise<ExchangeTransactionEntity> {
    const { userId, sourceCurrency, targetCurrency, sourceValue } = entity;
    const exchangeRate = await this.exchangeRateFetchService.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );
    const targetValue = sourceValue * exchangeRate;
    Logger.info(
      `Converted value: ${sourceValue}, conversion rate: ${exchangeRate}`,
    );
    Logger.info("Saving transaction");

    return await this.transactionRepository.save({
      userId,
      sourceCurrency,
      targetCurrency,
      sourceValue,
      targetValue,
      conversionRate: exchangeRate,
      date: new Date(),
    });
  }

  async listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionEntity[]> {
    Logger.info(`Fetching transactions for user ${userId}`);
    return await this.transactionRepository.findByUserId(userId);
  }
}

export const currencyService = new CurrencyTransactionService(
  transactionRepository,
  exchangeRateServiceIntegration,
);
