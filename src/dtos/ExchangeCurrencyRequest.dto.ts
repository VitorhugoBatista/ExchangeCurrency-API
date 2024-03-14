export interface ExchangeTransactionRequestDTO {
  userId: number;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}
