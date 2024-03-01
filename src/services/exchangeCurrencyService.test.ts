import { CurrencyService, currencyService } from "./exchangeCurrencyService";
import { ExchangeTransactionDTO } from "../models/transactions/DTO/exchangeTransactionDTO";

//
jest.mock("../repositories/transactionRepository", () => ({
  transactionRepository: {
    save: jest.fn(),
    findByUserId: jest.fn(),
  },
}));

jest.mock("../utils/axiosGet", () => ({
  exchangeRateServiceIntegration: {
    getExchangeRate: jest.fn(),
  },
}));

describe("CurrencyService", () => {
  const mockedTransactionRepository =
    require("../repositories/transactionRepository").transactionRepository;
  const mockedExchangeRateService =
    require("../utils/axiosGet").exchangeRateServiceIntegration;

  beforeEach(() => {
    let currencyService = new CurrencyService(
      mockedTransactionRepository,
      mockedExchangeRateService,
    );
    jest.clearAllMocks();
  });

  it("should convert currency correctly", async () => {
    const dto: ExchangeTransactionDTO = {
      userId: 1,
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: 100,
    };

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

    const result = await currencyService.convertCurrency(dto);
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
    const dto: ExchangeTransactionDTO = {
      userId: 1,
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: 100,
    };
    mockedExchangeRateService.getExchangeRate.mockRejectedValue(
      new Error("Error converting currency"),
    );
    await expect(currencyService.convertCurrency(dto)).rejects.toThrow(
      "Error converting currency",
    );
    expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(
      dto.fromCurrency,
      dto.toCurrency,
    );
  });

  it("should list transactions correctly", async () => {
    const dto = {
      userId: 1,
    };

    const expectedTransactions = [
      {
        userId: dto.userId,
        sourceCurrency: "USD",
        targetCurrency: "EUR",
        sourceValue: 100,
        targetValue: 85,
        conversionRate: 0.85,
        date: expect.any(Date),
      },
    ];

    mockedTransactionRepository.findByUserId.mockResolvedValue(
      expectedTransactions,
    );

    const result = await currencyService.listTransactionsByUserId(dto.userId);
    expect(result).toEqual(expectedTransactions);
    expect(mockedTransactionRepository.findByUserId).toHaveBeenCalledWith(
      dto.userId,
    );
  });
});
