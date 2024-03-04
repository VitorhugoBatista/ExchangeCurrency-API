import { CurrencyTransactionRequest } from "../controllers/currencyTransaction/CurrencyTransactionRequest";
import { SupportedCurrency } from "../types/SupportedCurrency";
import {
  CurrencyTransactionService,
  currencyService,
} from "./CurrencyTransactionService";

jest.mock("../repositories/CurrencyTransactionRepository", () => ({
  transactionRepository: {
    save: jest.fn(),
    findByUserId: jest.fn(),
  },
}));

jest.mock("../infra/axiosGet", () => ({
  exchangeRateServiceIntegration: {
    getExchangeRate: jest.fn(),
  },
}));

describe("CurrencyService", () => {
  const mockedTransactionRepository =
    require("../repositories/CurrencyTransactionRepository").transactionRepository;
  const mockedExchangeRateService =
    require("../infra/axiosGet").exchangeRateServiceIntegration;

  beforeEach(() => {
    let currencyService = new CurrencyTransactionService(
      mockedTransactionRepository,
      mockedExchangeRateService,
    );
    jest.clearAllMocks();
  });

  it("should convert currency correctly", async () => {
    const dto = new CurrencyTransactionRequest(
      100,
      SupportedCurrency.BRL,
      SupportedCurrency.EUR,
      1,
    );

    const expectedRate = 0.85;
    const expectedTransaction = {
      userId: dto.userId,
      sourceCurrency: dto.fromCurrency,
      targetCurrency: dto.toCurrency,
      sourceValue: dto.amount,
      targetValue: dto.amount * expectedRate,
      conversionRate: expectedRate,
      date: expect.any(Date),
    };

    mockedExchangeRateService.getExchangeRate.mockResolvedValue(expectedRate);
    mockedTransactionRepository.save.mockResolvedValue(expectedTransaction);

    const result = await currencyService.convertCurrency(dto.toEntity());
    expect(result).toEqual(expectedTransaction);
    expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(
      dto.fromCurrency,
      dto.toCurrency,
    );
    expect(mockedTransactionRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: dto.userId,
        sourceCurrency: dto.fromCurrency,
        targetCurrency: dto.toCurrency,
        sourceValue: dto.amount,
        targetValue: dto.amount * expectedRate,
        conversionRate: expectedRate,
      }),
    );
  });

  it("should throw an error when converting currency fails", async () => {
    const dto = new CurrencyTransactionRequest(
      100,
      SupportedCurrency.BRL,
      SupportedCurrency.EUR,
      1,
    );

    mockedExchangeRateService.getExchangeRate.mockRejectedValue(
      new Error("Error converting currency"),
    );
    await expect(
      currencyService.convertCurrency(dto.toEntity()),
    ).rejects.toThrow("Error converting currency");
    expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(
      dto.fromCurrency,
      dto.toCurrency,
    );
  });
});
