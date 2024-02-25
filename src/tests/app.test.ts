jest.mock('../services/exchangeCurrencyService', () => {
    return {
        listTransactions: jest.fn().mockResolvedValue([
            {
                userId: 1,
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                sourceValue: 100,
                targetValue: 85,
                conversionRate: 0.85,
                date: new Date().toISOString(),
                id: 123
            }
        ])
    };
});

import request from 'supertest';
import Server from '../server';

describe('API tests', () => {
    let server: Server;

    beforeAll(() => {
        server = new Server(3000);

    });

    it('should return 200', async () => {
        const response = await request(server.app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('should return 400 for unsupported currency', async () => {
        const response = await request(server.app)
            .post('/v1/currencyexchange')
            .send({
                amount: 100,
                fromCurrency: 'USD',
                toCurrency: 'XYZ',
                userId: 1,
            });

        expect(response.status).toBe(400);
    });

    describe('GET /v1/currencyexchange/list/{userId}', () => {
        it('should list transactions for a user', async () => {
            const userId = 1;
            const response = await request(server.app).get(`/v1/currencyexchange/list/${userId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.transactions).toEqual([
                expect.objectContaining({
                    userId: 1,
                    fromCurrency: 'USD',
                    toCurrency: 'EUR',
                    sourceValue: 100,
                    targetValue: 85,
                    conversionRate: 0.85,
                    id: 123,
                    date: expect.any(String)
                })
            ]);
        });

    });


    describe('POST /v1/currencyexchange', () => {
        it('should return 400 if any required parameter is missing', async () => {
            const response = await request(server.app)
                .post('/v1/currencyexchange')
                .send({
                    amount: 100,
                    fromCurrency: 'USD',
                    userId: 1,
                });
            expect(response.status).toBe(400);
        });
    })
    describe('POST /v1/currencyexchange', () => {
    it('should return 500 if an error occurs', async () => {
        const response = await request(server.app)
            .post('/v1/currencyexchange')
            .send({
                amount: 100,
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                userId: 1,
            });

            })

});

})