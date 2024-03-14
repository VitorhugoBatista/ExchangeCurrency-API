import { IsIn, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { ExchangeTransactionEntity } from "../../models/entities/CurrencyTransaction.entity";
import { SupportedCurrency } from "../../types/SupportedCurrency";
import { ExchangeTransactionRequestDTO } from "../../dtos/ExchangeCurrencyRequest.dto";

export class CurrencyTransactionRequest
  implements ExchangeTransactionRequestDTO
{
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

  constructor() {}
}
