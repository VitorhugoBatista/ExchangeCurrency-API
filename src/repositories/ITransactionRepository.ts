import { ExchangeTransaction} from '../models/transactions/exchangeTransaction';
import { ExchangeTransactionResponse } from '../models/response/exchangeTransactionResponse';

export interface ITransactionRepository {
    save(transaction: ExchangeTransaction): Promise<ExchangeTransactionResponse>;
    findByUserId(userId: number): Promise<ExchangeTransactionResponse[]>;
}