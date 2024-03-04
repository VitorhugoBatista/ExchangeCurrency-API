import request from "supertest";
import { app } from "../app";
import { CurrencyTransactionRequest } from "../controllers/currencyTransaction/CurrencyTransactionRequest";
import { AppDataSource } from "../config/database/dataSource";
import { SupportedCurrency } from "../types/SupportedCurrency";
let apps: any;
describe("Routers Test /", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    apps = app.listen(3000);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    await apps.close();
  });
  it("should return 200 /", async () => {
    const res = await request(apps).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("should convert currency and return converted amount", async () => {
    const mockData = {
      userId: 1,
      fromCurrency: "USD",
      toCurrency: "BRL",
      amount: 100,
    };
    const res = await request(apps).post("/v1/conversions").send(mockData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("convertedAmount");
  });

  it("should return 400 by passing not allowed currency", async () => {
    const mockData = {
      userId: 1,
      fromCurrency: "USD",
      toCurrency: "PTR",
      amount: 100,
    };
    const res = await request(apps).post("/v1/conversions").send(mockData);
    expect(res.statusCode).toEqual(400);
  });
  it("should return 400 by passing negative amount", async () => {
    const mockData = {
      userId: 1,
      fromCurrency: "USD",
      toCurrency: "BRL",
      amount: -3,
    };
    const res = await request(apps).post("/v1/conversions").send(mockData);
    expect(res.statusCode).toEqual(400);
  });
});
