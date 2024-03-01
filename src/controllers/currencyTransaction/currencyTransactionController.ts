import { Request, Response } from "express";
import { Logger } from "../../logger/logger";
import { currencyService } from "../../services/CurrencyTransactionService";
import { CurrencyTransactionRequest } from "./CurrencyTransactionRequest";

export const currencyTransactionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { amount, fromCurrency, toCurrency, userId } = req.body;
    const transactionRequest = new CurrencyTransactionRequest(
      amount,
      fromCurrency,
      toCurrency,
      userId,
    );
    Logger.info(
      `Converting ${transactionRequest.amount} ${transactionRequest.fromCurrency} to ${transactionRequest.toCurrency}`,
    );
    const toEntity = transactionRequest.toEntity();
    const convertedAmount = await currencyService.convertCurrency(toEntity);
    Logger.info(
      `Converted ${transactionRequest.amount} ${transactionRequest.fromCurrency} to ${convertedAmount.targetValue} ${convertedAmount.targetCurrency}`,
    );
    res.json({ convertedAmount });
  } catch (error) {
    Logger.error("Error converting currency:", error);
    res.status(500).json({ errors: "Error converting currency.", error });
  }
};

export const listConvertCurrencyController = async (
  req: Request,
  res: Response,
) => {
  try {
    let userId = parseInt(req.params.userId);
    Logger.info(`Fetching transactions for user ${userId}`);
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
export { CurrencyTransactionRequest };
