import GemTransaction from "../models/GemTransaction.js";

export const createGemTransaction = async (
  transactionData,
  session
) => {
  const [transaction] = await GemTransaction.create(
    [transactionData],
    { session }
  );

  return transaction;
};

export const findGemTransactionsByUserId = async (userId) => {
  return GemTransaction.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};