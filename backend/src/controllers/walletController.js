import {
  findGemWalletByUserId,
} from "../queries/walletQueries.js";

export const getGemBalance = async (req, res) => {
  try {
    const wallet = await findGemWalletByUserId(
      req.user.userId
    );

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "GEM wallet not found.",
      });
    }

    return res.status(200).json({
      success: true,
      wallet: {
        currency: wallet.currency,
        balance: wallet.balance,
      },
    });
  } catch (error) {
    console.error("Get GEM balance error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get GEM balance.",
    });
  }
};