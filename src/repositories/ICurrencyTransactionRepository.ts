import { ExchangeTransactionEntity } from "../models/entities/CurrencyTransaction.entity";

export interface ITransactionRepository {
  save(
    transaction: ExchangeTransactionEntity,
  ): Promise<ExchangeTransactionEntity>;
  findByUserId(userId: number): Promise<ExchangeTransactionEntity[]>;
}
