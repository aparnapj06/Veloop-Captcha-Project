import {
  getCurrentChallenge,
  createChallenge,
  verifyChallenge,
  claimReward,
  noThanks,
  getCaptchaHistory,
} from "../services/captchaService.js";

export const getCurrentCaptcha = async (req, res) => {
  try {
    const challenge = await getCurrentChallenge(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      captcha: challenge,
    });
  } catch (error) {
    console.error("Get current CAPTCHA error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get CAPTCHA.",
    });
  }
};

export const verifyCaptcha = async (req, res) => {
  try {
    const {
      challengeId,
      selectedOption,
    } = req.body;

    const result = await verifyChallenge({
      userId: req.user.userId,
      challengeId,
      selectedOption,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Verify CAPTCHA error:", error);

    if (
      error.message ===
      "Challenge not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "This CAPTCHA has already been completed."
    ) {
      return res.status(409).json({
        success: false,
        code: "CHALLENGE_ALREADY_COMPLETED",
        message: error.message,
      });
    }

    if (
      error.message ===
      "Challenge expired. Please continue with a new CAPTCHA."
    ) {
      return res.status(410).json({
        success: false,
        code: "CHALLENGE_EXPIRED",
        message: error.message,
      });
    }

    if (
      error.message ===
      "Selected option is invalid."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
        "Challenge ID is required." ||
      error.message ===
        "Selected option is required."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to verify CAPTCHA.",
    });
  }
};

export const claimCaptcha = async (req, res) => {
  try {
    const { challengeId } = req.body;

    const result = await claimReward({
      userId: req.user.userId,
      challengeId,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Claim CAPTCHA reward error:", error);

    if (
      error.message ===
      "Challenge not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Challenge has not been completed."
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "This reward has already been claimed."
    ) {
      return res.status(409).json({
        success: false,
        code: "REWARD_ALREADY_CLAIMED",
        message: error.message,
      });
    }

    if (
      error.message ===
      "Challenge ID is required."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to claim reward.",
    });
  }
};

export const noThanksCaptcha = async (req, res) => {
  try {
    const { challengeId } = req.body;

    const challenge = await noThanks({
      userId: req.user.userId,
      challengeId,
    });

    return res.status(200).json({
      success: true,
      captcha: challenge,
    });
  } catch (error) {
    console.error("No Thanks CAPTCHA error:", error);

    if (
      error.message ===
      "Challenge not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Challenge cannot be discarded."
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Challenge ID is required."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create new CAPTCHA.",
    });
  }
};

export const getNewCaptcha = async (req, res) => {
  try {
    const challenge = await createChallenge(
      req.user.userId
    );

    return res.status(201).json({
      success: true,
      captcha: challenge,
    });
  } catch (error) {
    console.error("Create new CAPTCHA error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create new CAPTCHA.",
    });
  }
};
export const getCaptchaHistoryController = async (req, res) => {
  try {
    const history = await getCaptchaHistory(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get CAPTCHA history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get CAPTCHA history.",
    });
  }
};