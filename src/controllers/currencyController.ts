import { Request, Response } from "express";
import { currencyService } from "../services/exchangeCurrencyService";
import { Logger } from "../logger/logger";

export const convertCurrencyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { amount, fromCurrency, toCurrency, userId } = req.body;

    const data = { userId, fromCurrency, toCurrency, amount };

    const convertedAmount = await currencyService.convertCurrency(data);

    res.json({ convertedAmount });
  } catch (error) {
    Logger.error("Error converting currency:", error);

    res.status(500).json({ error: "Error converting currency." });
  }
};

export const listConvertCurrencyController = async (
  req: Request,
  res: Response,
) => {
  try {
    let userId = parseInt(req.params.userId);

    const listTransactionsbyUserId =
      await currencyService.listTransactionsByUserId(userId);

    if (listTransactionsbyUserId.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for the given userId." });
    }

    res.json({ transactions: listTransactionsbyUserId });
  } catch (error) {
    Logger.error("Error listing transactions:", error);

    res.status(500).json({ error: "Error listing transactions." });
  }
};
