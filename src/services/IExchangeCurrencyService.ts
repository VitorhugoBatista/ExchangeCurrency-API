import { ExchangeTransactionEntity } from "../models/CurrencyTransactionEntity";

export interface IExchangeCurrencyService {
  convertCurrency(
    data: ExchangeTransactionEntity,
  ): Promise<ExchangeTransactionEntity>;

  listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionEntity[]>;
}
