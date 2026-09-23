import Wallet from "../models/Wallet.js";

export const createWallet = async ({ userId, balance = 0 }) => {
  return Wallet.create({
    userId,
    currency: "GEM",
    balance,
  });
};

export const findGemWalletByUserId = async (userId) => {
  return Wallet.findOne({
    userId,
    currency: "GEM",
  });
};

export const findGemWalletByUserIdForUpdate = async (
  userId,
  session
) => {
  return Wallet.findOne({
    userId,
    currency: "GEM",
  }).session(session);
};

export const updateGemWalletBalance = async ({
  userId,
  amount,
  session,
}) => {
  if (!session) {
    throw new Error(
      "A MongoDB transaction session is required."
    );
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Wallet credit amount must be greater than 0.");
  }

  const wallet = await Wallet.findOne({
    userId,
    currency: "GEM",
  }).session(session);

  if (!wallet) {
    throw new Error("GEM wallet not found.");
  }

  const balanceBefore = wallet.balance;

  const balanceAfter = Number(
    (balanceBefore + amount).toFixed(2)
  );

  wallet.balance = balanceAfter;

  await wallet.save({ session });

  return {
    wallet,
    balanceBefore,
    balanceAfter,
  };
};