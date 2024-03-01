import { ExchangeTransactionEntity } from "../models/CurrencyTransactionEntity";

export interface ITransactionRepository {
  save(
    transaction: ExchangeTransactionEntity,
  ): Promise<ExchangeTransactionEntity>;
  findByUserId(userId: number): Promise<ExchangeTransactionEntity[]>;
}
