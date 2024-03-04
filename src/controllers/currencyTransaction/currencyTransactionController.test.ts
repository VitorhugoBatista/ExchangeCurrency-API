import request from "supertest";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { currencyTransactionController } from "./currencyTransactionController";

jest.mock("../../services/CurrencyTransactionService", () => {
  const mockTransactionsList = [
    {
      userId: 1,
      sourceCurrency: "BRL",
      targetCurrency: "BRL",
      sourceValue: 1,
      targetValue: 1,
      conversionRate: 1,
      date: "2024-03-04T16:25:39.547Z",
      id: 31,
    },
    {
      userId: 1,
      sourceCurrency: "USD",
      targetCurrency: "EUR",
      sourceValue: 100,
      targetValue: 85,
      conversionRate: 0.85,
      date: "2024-03-04T17:00:00.000Z",
      id: 32,
    },
    {
      userId: 1,
      sourceCurrency: "EUR",
      targetCurrency: "USD",
      sourceValue: 50,
      targetValue: 60,
      conversionRate: 1.2,
      date: "2024-03-04T18:30:00.000Z",
      id: 33,
    },
  ];
  return {
    currencyService: {
      convertCurrency: jest.fn().mockResolvedValue({}),
      listTransactionsByUserId: jest
        .fn()
        .mockResolvedValue(mockTransactionsList),
    },
  };
});

let app: Express;

beforeAll(() => {
  app = express();
  app.use(bodyParser.json());
  app.post("/v1/conversions", currencyTransactionController);
  app.get("/v1/users/:userId/conversions", currencyTransactionController);
});

describe("currencyTransactionController", () => {
  it("should convert currency", async () => {
    const response = await request(app).post("/v1/conversions").send({
      amount: 100,
      fromCurrency: "BRL",
      toCurrency: "BRL",
      userId: 1,
    });

    expect(response.statusCode).toBe(200);
  });

  describe("listConvertCurrencyController", () => {
    it("should list transactions by userId", async () => {
      const userId = 1;
      const response = await request(app).get(
        `/v1/users/${userId}/conversions`,
      );

      expect(response.statusCode).toBe(200);
    });
  });
});
