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
    const transaction = new CurrencyTransactionRequest(
      amount,
      fromCurrency,
      toCurrency,
      userId,
    );
    const convertedAmount = await currencyService.convertCurrency(
      transaction.toEntity(),
    );
    res.status(200).json({ convertedAmount });
  } catch (error: any) {
    if (!res.headersSent) {
      if (error.type === "GENERAL") {
        return res.status(400).json({ error: "missing or invalid API URL" });
      } else if (error.type === "UNAUTHORIZED") {
        return res.status(400).json({ error: "missing or invalid API key" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const listConvertCurrencyController = async (
  req: Request,
  res: Response,
) => {
  try {
    let userId = parseInt(req.params.id);
    const listTransactionsbyUserId =
      await currencyService.listTransactionsByUserId(userId);

    if (listTransactionsbyUserId.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for the given userId." });
    }

    res.json({ transactions: listTransactionsbyUserId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error listing transactions." });
  }
};
