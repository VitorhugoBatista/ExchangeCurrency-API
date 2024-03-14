import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExchangeTransactionTable1612345678901
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "exchange_transaction_entity",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "integer",
          },
          {
            name: "sourceCurrency",
            type: "varchar",
          },
          {
            name: "targetCurrency",
            type: "varchar",
          },
          {
            name: "sourceValue",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "targetValue",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "conversionRate",
            type: "float",
          },
          {
            name: "date",
            type: "text",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("exchange_transaction_entity");
  }
}
