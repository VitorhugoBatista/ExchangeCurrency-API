import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExchangeTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  sourceCurrency: string;

  @Column()
  targetCurrency: string;

  @Column("decimal", { precision: 10, scale: 2 })
  sourceValue: number;

  @Column("decimal", { precision: 10, scale: 2 })
  targetValue: number;

  @Column("float")
  conversionRate: number;

  @Column({ type: "text" })
  date: Date;
}
