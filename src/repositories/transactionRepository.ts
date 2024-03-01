import { AppDataSource } from "../config/database/dataSource";
import { ExchangeTransactionEntity } from "../models/entities/exchangeTransactionEntity";
import { ExchangeTransaction } from "../models/transactions/exchangeTransaction";
import { ExchangeTransactionResponse } from "../models/response/exchangeTransactionResponse";
import { ITransactionRepository } from "./ITransactionRepository";
class TransactionRepository implements ITransactionRepository {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(ExchangeTransactionEntity);
  }

  async save(
    transaction: ExchangeTransaction,
  ): Promise<ExchangeTransactionResponse> {
    return await this.repo.save(transaction);
  }

  async findByUserId(userId: number): Promise<ExchangeTransactionResponse[]> {
    return await this.repo.find({
      where: { userId },
    });
  }
}

export const transactionRepository = new TransactionRepository();
