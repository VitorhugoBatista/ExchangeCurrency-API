import { AppDataSource } from '../config/database/dataSource';
import { ExchangeTransaction } from '../entities/exchangeTransaction';


export const transactionRepository = AppDataSource.getRepository(ExchangeTransaction);
