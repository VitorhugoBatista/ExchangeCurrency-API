import request from "supertest";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { currencyTransactionController } from "./currencyTransactionController";
let app: Express;

jest.mock("../../services/CurrencyTransactionService", () => ({
  currencyService: {
    convertCurrency: jest.fn().mockImplementation(() =>
      Promise.resolve({
        userId: 1,
        sourceCurrency: "USD",
        targetCurrency: "EUR",
        sourceValue: 100,
        targetValue: 85,
        conversionRate: 0.85,
        date: new Date(),
        id: 1,
      }),
    ),
    listTransactionsByUserId: jest.fn((userId) => {
      if (userId === 1) {
        return Promise.resolve([
          {
            userId: 1,
            sourceCurrency: "USD",
            targetCurrency: "EUR",
            sourceValue: 100,
            targetValue: 85,
            conversionRate: 0.85,
            date: new Date(),
            id: 1,
          },
        ]);
      } else {
        return Promise.resolve([]);
      }
    }),
  },
}));

beforeEach(() => {
  app = express();
  app.use(bodyParser.json());
  app.post("/v1/conversions", currencyTransactionController);
  app.get("/v1/users/:userId/conversions", currencyTransactionController);
  jest.clearAllMocks();
});

describe("Currency Transaction Controller Tests", () => {
  it("successfully converts currency", async () => {
    const response = await request(app)
      .post("/v1/conversions")
      .send({ userId: 1, fromCurrency: "USD", toCurrency: "EUR", amount: 100 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      convertedAmount: {
        userId: 1,
        sourceCurrency: "USD",
        targetCurrency: "EUR",
        sourceValue: 100,
        targetValue: 85,
        conversionRate: 0.85,
        date: expect.any(String),
        id: 1,
      },
    });
  });

  describe("GET /v1/users/:userId/conversions", () => {
    it("should respond with 200 OK and a list of transactions for a given userId", async () => {
      const userId = 1;
      const response = await request(app).get(
        `/v1/users/${userId}/conversions`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          convertedAmount: expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            sourceCurrency: expect.any(String),
            targetCurrency: expect.any(String),
            sourceValue: expect.any(Number),
            targetValue: expect.any(Number),
            conversionRate: expect.any(Number),
            date: expect.any(String),
          }),
        }),
      );
    });
  });
});
describe("GET /v1/users/:userId/conversions", () => {
  it("should respond with 404 Not Found for a userId with no transactions", async () => {
    const userId = 3;
    const response = await request(app).get(`/v1/users/${userId}/conversion`);
    expect(response.statusCode).toBe(404);
  });
});
