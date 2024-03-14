import { ExchangeTransactionRequestDTO } from "../dtos/ExchangeCurrencyRequest.dto";
import { ExchangeTransactionResponseDTO } from "../dtos/ExchangeTransactionResponse.dto";

export interface IExchangeCurrencyService {
  convertCurrency(
    data: ExchangeTransactionRequestDTO,
  ): Promise<ExchangeTransactionResponseDTO>;

  listTransactionsByUserId(
    userId: number,
  ): Promise<ExchangeTransactionResponseDTO[]>;
}
