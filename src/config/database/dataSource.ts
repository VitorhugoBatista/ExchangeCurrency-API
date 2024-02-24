import { DataSource } from 'typeorm';
import { ExchangeTransaction } from '../../entities/exchangesRequest';
import path from 'path';

const databasePath = path.join(__dirname, '..', '..', 'config', 'database', 'database.db');

export const AppDataSource = new DataSource({
    type: 'sqlite', 
    database: databasePath,
    synchronize: true, 
    logging: false,
    entities: [ExchangeTransaction]
});