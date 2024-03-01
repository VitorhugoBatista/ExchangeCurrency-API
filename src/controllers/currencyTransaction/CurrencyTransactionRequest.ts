import { IsIn, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { ExchangeTransactionEntity } from "../../models/CurrencyTransactionEntity";
import { SupportedCurrency } from "../../types/SupportedCurrency";

export class CurrencyTransactionRequest {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsIn(Object.values(SupportedCurrency))
  fromCurrency: SupportedCurrency;

  @IsNotEmpty()
  @IsIn(Object.values(SupportedCurrency))
  toCurrency: SupportedCurrency;

  @IsNumber()
  @IsPositive()
  userId: number;

  constructor(
    amount: number,
    fromCurrency: SupportedCurrency,
    toCurrency: SupportedCurrency,
    userId: number,
  ) {
    this.amount = amount;
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.userId = userId;
  }

  toEntity(): ExchangeTransactionEntity {
    const entity = new ExchangeTransactionEntity();
    entity.sourceValue = this.amount;
    entity.sourceCurrency = this.fromCurrency;
    entity.targetCurrency = this.toCurrency;
    entity.userId = this.userId;
    return entity;
  }
}
