export interface ExchangeTransactionResponseDTO {
  id?: number;
  userId: number;
  sourceCurrency: string;
  targetCurrency: string;
  sourceValue: number;
  targetValue: number;
  conversionRate: number;
  date: Date;
}
