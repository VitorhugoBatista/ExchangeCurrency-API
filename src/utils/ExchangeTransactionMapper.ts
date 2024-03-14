import { ExchangeTransactionEntity } from "../models/entities/CurrencyTransaction.entity";
import { ExchangeTransactionResponseDTO } from "../dtos/ExchangeTransactionResponse.dto";

export function mapToExchangeTransactionResponseDTO(
  transaction: ExchangeTransactionEntity,
): ExchangeTransactionResponseDTO {
  return {
    userId: transaction.userId,
    sourceCurrency: transaction.sourceCurrency,
    targetCurrency: transaction.targetCurrency,
    sourceValue: transaction.sourceValue,
    targetValue: transaction.targetValue,
    conversionRate: transaction.conversionRate,
    date: transaction.date,
  };
}
