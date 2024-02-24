import { AppDataSource } from '../config/database/dataSource';
import { ExchangeTransaction } from '../entities/exchangesRequest';


export const transactionRepository = AppDataSource.getRepository(ExchangeTransaction);
