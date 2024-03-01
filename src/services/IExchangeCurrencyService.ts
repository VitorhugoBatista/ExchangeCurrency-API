import { ExchangeTransactionResponse } from "../models/response/exchangeTransactionResponse";
import { ExchangeTransactionDTO } from "../models/transactions/DTO/exchangeTransactionDTO";
import { ExchangeTransaction } from "../models/transactions/exchangeTransaction";

export interface IExchangeCurrencyService {
  convertCurrency(data: ExchangeTransactionDTO): Promise<ExchangeTransaction>;

  listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionResponse[]>;
}
