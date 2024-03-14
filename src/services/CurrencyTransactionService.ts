import {
  ExchangeRateServiceIntegration,
  exchangeRateServiceIntegration,
} from "../infra/axiosGet";
import { Logger } from "../logger/logger";
import { ExchangeTransactionEntity } from "../models/entities/CurrencyTransaction.entity";
import { ITransactionRepository } from "../repositories/ICurrencyTransactionRepository";
import { transactionRepository } from "../repositories/CurrencyTransactionRepository";
import { IExchangeCurrencyService } from "./IExchangeCurrencyService";
import { ExchangeTransactionResponseDTO } from "../dtos/ExchangeTransactionResponse.dto";
import { ExchangeTransactionRequestDTO } from "../dtos/ExchangeCurrencyRequest.dto";
import { mapToExchangeTransactionResponseDTO } from "../utils/ExchangeTransactionMapper";

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
    data: ExchangeTransactionRequestDTO,
  ): Promise<ExchangeTransactionResponseDTO> {
    const { userId, fromCurrency, toCurrency, amount } = data;

    Logger.info(`Fetching exchange rate for ${fromCurrency} to ${toCurrency}`);
    const exchangeRate = await this.exchangeRateFetchService.getExchangeRate(
      fromCurrency,
      toCurrency,
    );
    const targetValue = amount * exchangeRate;
    Logger.info(`Converted value: ${amount}, conversion rate: ${exchangeRate}`);
    Logger.info("Saving transaction");

    const savedTransaction = await this.transactionRepository.save({
      userId,
      sourceCurrency: fromCurrency,
      targetCurrency: toCurrency,
      sourceValue: amount,
      targetValue,
      conversionRate: exchangeRate,
      date: new Date(),
    });

    return mapToExchangeTransactionResponseDTO(savedTransaction);
  }
  async listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionEntity[]> {
    Logger.info(`Fetching transactions for user ${userId}`);
    const transactions = await this.transactionRepository.findByUserId(userId);
    return transactions.map(mapToExchangeTransactionResponseDTO);
  }
}

export const currencyService = new CurrencyTransactionService(
  transactionRepository,
  exchangeRateServiceIntegration,
);
