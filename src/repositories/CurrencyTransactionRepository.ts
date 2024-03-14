import { AppDataSource } from "../config/database/dataSource";
import { ExchangeTransactionEntity } from "../models/entities/CurrencyTransaction.entity";
import { ITransactionRepository } from "./ICurrencyTransactionRepository";

class CurrencyTransactionRepository implements ITransactionRepository {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(ExchangeTransactionEntity);
  }

  async save(
    transaction: ExchangeTransactionEntity,
  ): Promise<ExchangeTransactionEntity> {
    return await this.repo.save(transaction);
  }

  async findByUserId(userId: number): Promise<ExchangeTransactionEntity[]> {
    return await this.repo.find({
      where: { userId },
    });
  }
}

export const transactionRepository = new CurrencyTransactionRepository();
