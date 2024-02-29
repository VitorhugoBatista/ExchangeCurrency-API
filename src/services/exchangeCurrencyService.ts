import { ExchangeRateServiceIntegration, exchangeRateServiceIntegration } from "../utils/axiosGet";
import { ErrorHandler } from "../utils/errorHandler";
import { ExchangeTransaction} from '../models/transactions/exchangeTransaction';
import { ExchangeTransactionResponse } from '../models/response/exchangeTransactionResponse';
import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { transactionRepository } from "../repositories/transactionRepository";
import { ExchangeTransactionDTO } from "../models/transactions/DTO/exchangeTransactionDTO";

export class CurrencyService {
    private transactionRepository: ITransactionRepository;
    private exchangeRateService: ExchangeRateServiceIntegration;

    constructor(
        transactionRepository: ITransactionRepository, 
        exchangeRateService: ExchangeRateServiceIntegration
    ) {
        this.transactionRepository = transactionRepository;
        this.exchangeRateService = exchangeRateService;
    }

    async convertCurrency(data: ExchangeTransactionDTO): Promise<ExchangeTransaction> {
        try {
            const rate = await this.exchangeRateService.getExchangeRate(data.fromCurrency, data.toCurrency);
            const convertedAmount = data.amount * rate;
            const newTransaction = await this.transactionRepository.save({
                userId: data.userId,
                sourceCurrency: data.fromCurrency,
                targetCurrency: data.toCurrency,
                sourceValue: data.amount,
                targetValue: convertedAmount,
                conversionRate: rate,
                date: new Date(),
            });
            return newTransaction;
        } catch (error) {
            console.error('Error converting currency:', error);
            throw new ErrorHandler('Error converting currency', 'GENERAL');
        }
    }

    async listTransactions(userId: number): Promise<ExchangeTransactionResponse[]> {
        return await this.transactionRepository.findByUserId(userId);
    }
}

export const currencyService = new CurrencyService(transactionRepository, exchangeRateServiceIntegration);
