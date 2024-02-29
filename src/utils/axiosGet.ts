import axios, { AxiosResponse } from 'axios';
import { ErrorHandler } from './errorHandler';

export class ExchangeRateServiceIntegration {
    private apiUrl: string | undefined;
    private apiKey: string | undefined;

    constructor() {
        this.apiUrl = process.env.API_EXCHANGE_URL 
        this.apiKey = process.env.EXCHANGE_RATE_API_KEY ;
    }
    
    async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
        const url = `${this.apiUrl}/latest?symbols=${toCurrency}&base=${fromCurrency}`;

        try {
            const response: AxiosResponse = await axios.get(url, {
                headers: {
                    'apikey': this.apiKey
                }
            });

            if (response.data && response.data.rates && response.data.rates[toCurrency]) {
                return response.data.rates[toCurrency];
            } else {
                throw new ErrorHandler('Currency not found', 'NOT_FOUND');
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            throw new ErrorHandler('Error fetching exchange rate', 'GENERAL');
        }
    }
}

export const exchangeRateServiceIntegration = new ExchangeRateServiceIntegration()