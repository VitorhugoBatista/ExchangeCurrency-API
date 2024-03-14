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

const expectedRate = 1;

const dto = {
  userId: 1,
  fromCurrency: "BRL",
  toCurrency: "BRL",
  amount: 1,
}

    mockedExchangeRateService.getExchangeRate.mockResolvedValue(1);
    mockedTransactionRepository.save.mockResolvedValue({
      id: 1,
      userId: dto.userId,
      sourceCurrency: dto.fromCurrency,
      targetCurrency: dto.toCurrency,
      sourceValue: dto.amount,
      amount:1,
      conversionRate: expectedRate,
      date: new Date(),
    });

    const result = await currencyService.convertCurrency(dto);
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
        targetValue: 1,
        conversionRate: expectedRate,
        date: expect.any(Date),
      }),
    );
  });

  it("should throw an error when converting currency fails", async () => {
    const dto = {
      userId: 1,
      fromCurrency: "BRL",
      toCurrency: "BRL",
      amount: 1,
    }

    mockedExchangeRateService.getExchangeRate.mockRejectedValue(
      new Error("Error converting currency"),
    );
    await expect(
      currencyService.convertCurrency(dto),
    ).rejects.toThrow("Error converting currency");
    expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(
      dto.fromCurrency,
      dto.toCurrency,
    );
  });
});
