import { DataSource } from "typeorm";
import { ExchangeTransactionEntity } from "../../models/entities/CurrencyTransaction.entity";
import path from "path";

const databasePath = path.join(
  __dirname,
  "..",
  "..",
  "config",
  "database",
  "database.db",
);

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "..", "..", "..", "data", "database.sqlite"),
  synchronize: false,
  logging: false,
  entities: [ExchangeTransactionEntity],
  migrations: [path.join(__dirname, "..", "..", "migrations", "*.js")],
});
