import mongoose from "mongoose";
import crypto from "crypto";

import {
  createCaptchaChallenge,
  findActiveCaptchaChallengeByUserId,
  findCaptchaChallengeByIdAndUserId,
  completeCaptchaChallenge,
  discardCaptchaChallenge,
  claimCaptchaReward,
  findCaptchaHistoryByUserId,
} from "../queries/captchaChallengeQueries.js";
import {
  findActiveCaptchaRewardConfig,
} from "../queries/captchaRewardConfigQueries.js";

import {
  updateGemWalletBalance,
} from "../queries/walletQueries.js";

import {
  createGemTransaction,
} from "../queries/gemTransactionQueries.js";

import {
  createAuditLog,
} from "../queries/auditLogQueries.js";

const CAPTCHA_LENGTH = 6;

const CHALLENGE_EXPIRY_MS = 2 * 60 * 1000;

const CAPTCHA_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const createCaptchaText = () => {
  let captchaText = "";

  for (let index = 0; index < CAPTCHA_LENGTH; index += 1) {
    const randomIndex = crypto.randomInt(
      0,
      CAPTCHA_CHARACTERS.length
    );

    captchaText += CAPTCHA_CHARACTERS[randomIndex];
  }

  return captchaText;
};

/* =========================================================
   SIMILAR OPTION
   Changes exactly ONE character from the original CAPTCHA
   ========================================================= */

const createSimilarOption = (captchaText) => {
  const characters = captchaText.split("");

  const changeIndex = crypto.randomInt(
    0,
    characters.length
  );

  let replacementCharacter =
    CAPTCHA_CHARACTERS[
      crypto.randomInt(
        0,
        CAPTCHA_CHARACTERS.length
      )
    ];

  while (replacementCharacter === characters[changeIndex]) {
    replacementCharacter =
      CAPTCHA_CHARACTERS[
        crypto.randomInt(
          0,
          CAPTCHA_CHARACTERS.length
        )
      ];
  }

  characters[changeIndex] = replacementCharacter;

  return characters.join("");
};

/* =========================================================
   COMPLETELY DIFFERENT OPTION
   Generates an option sharing NO characters with the
   original CAPTCHA
   ========================================================= */

const createDifferentOption = (captchaText) => {
  const originalCharacters = new Set(captchaText);

  let differentOption;

  do {
    differentOption = createCaptchaText();
  } while (
    [...differentOption].some((character) =>
      originalCharacters.has(character)
    )
  );

  return differentOption;
};

const shuffleOptions = (options) => {
  const shuffled = [...options];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = crypto.randomInt(0, index + 1);

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const buildCaptchaOptions = (captchaText) => {
  const firstSimilar = createSimilarOption(captchaText);

  let secondSimilar = createSimilarOption(captchaText);

  while (secondSimilar === firstSimilar) {
    secondSimilar = createSimilarOption(captchaText);
  }

  const differentOption =
    createDifferentOption(captchaText);

  return shuffleOptions([
    captchaText,
    firstSimilar,
    secondSimilar,
    differentOption,
  ]);
};

const createChallengeId = () => {
  return `CAP-${crypto
    .randomBytes(6)
    .toString("hex")
    .toUpperCase()}`;
};

const formatPublicChallenge = (challenge) => {
  return {
    challengeId: challenge.challengeId,
    captchaText: challenge.captchaText,
    options: challenge.options,
    status: challenge.status,
    expiresAt: challenge.expiresAt,
    createdAt: challenge.createdAt,
  };
};

export const createChallenge = async (userId) => {
  const captchaText = createCaptchaText();

  const options = buildCaptchaOptions(captchaText);

  const challenge = await createCaptchaChallenge({
    challengeId: createChallengeId(),
    userId,
    captchaText,
    options,
    correctOption: captchaText,
    status: "ACTIVE",
    expiresAt: new Date(
      Date.now() + CHALLENGE_EXPIRY_MS
    ),
    selectedOption: null,
    result: null,
    rewardAmount: null,
    rewardStatus: "PENDING",
  });

  await createAuditLog({
    userId,
    action: "CHALLENGE_CREATED",
    referenceId: challenge.challengeId,
  });

  return formatPublicChallenge(challenge);
};

export const getCurrentChallenge = async (userId) => {
  let challenge =
    await findActiveCaptchaChallengeByUserId(userId);

  if (!challenge) {
    return createChallenge(userId);
  }

  if (challenge.expiresAt <= new Date()) {
    await discardCaptchaChallenge(
      challenge.challengeId,
      userId
    );

    await createAuditLog({
      userId,
      action: "EXPIRED_CHALLENGE",
      referenceId: challenge.challengeId,
    });

    return createChallenge(userId);
  }

  return formatPublicChallenge(challenge);
};

export const verifyChallenge = async ({
  userId,
  challengeId,
  selectedOption,
}) => {
  if (!challengeId) {
    throw new Error("Challenge ID is required.");
  }

  if (!selectedOption) {
    throw new Error("Selected option is required.");
  }

  const session = await mongoose.startSession();

  try {
    let verificationResult;

    await session.withTransaction(async () => {
      const challenge =
        await findCaptchaChallengeByIdAndUserId(
          challengeId,
          userId,
          session
        );

      if (!challenge) {
        throw new Error("Challenge not found.");
      }

      if (challenge.status !== "ACTIVE") {
        await createAuditLog(
          {
            userId,
            action: "DUPLICATE_ATTEMPT",
            referenceId: challengeId,
          },
          session
        );

        throw new Error(
          "This CAPTCHA has already been completed."
        );
      }

      if (challenge.expiresAt <= new Date()) {
        await discardCaptchaChallenge(
          challengeId,
          userId
        );

        await createAuditLog(
          {
            userId,
            action: "EXPIRED_CHALLENGE",
            referenceId: challengeId,
          },
          session
        );

        throw new Error(
          "Challenge expired. Please continue with a new CAPTCHA."
        );
      }

      if (!challenge.options.includes(selectedOption)) {
        await createAuditLog(
          {
            userId,
            action: "INVALID_ATTEMPT",
            referenceId: challengeId,
            metadata: {
              selectedOption,
            },
          },
          session
        );

        throw new Error(
          "Selected option is invalid."
        );
      }

      const rewardConfig =
        await findActiveCaptchaRewardConfig();

      if (!rewardConfig) {
        throw new Error(
          "Active CAPTCHA reward configuration not found."
        );
      }

      const isCorrect =
        selectedOption === challenge.correctOption;

      const result = isCorrect
        ? "CORRECT"
        : "WRONG";

      const rewardAmount = isCorrect
        ? rewardConfig.correctReward
        : rewardConfig.wrongReward;

      const completedChallenge =
        await completeCaptchaChallenge({
          challengeId,
          userId,
          selectedOption,
          result,
          rewardAmount,
          session,
        });

      if (!completedChallenge) {
        await createAuditLog(
          {
            userId,
            action: "DUPLICATE_ATTEMPT",
            referenceId: challengeId,
          },
          session
        );

        throw new Error(
          "This CAPTCHA has already been completed."
        );
      }

      const walletUpdate =
        await updateGemWalletBalance({
          userId,
          amount: rewardAmount,
          session,
        });

      const transactionId = `GEM-${crypto
        .randomBytes(8)
        .toString("hex")
        .toUpperCase()}`;

      await createGemTransaction(
        {
          transactionId,
          userId,
          currency: "GEM",
          amount: rewardAmount,
          type: "CAPTCHA_REWARD",
          source: "CAPTCHA_EARN",
          referenceId: challengeId,
          balanceBefore: walletUpdate.balanceBefore,
          balanceAfter: walletUpdate.balanceAfter,
          status: "COMPLETED",
        },
        session
      );

      await createAuditLog(
        {
          userId,
          action: "CHALLENGE_VERIFIED",
          referenceId: challengeId,
          metadata: {
            result,
            rewardAmount,
          },
        },
        session
      );

      await createAuditLog(
        {
          userId,
          action: "REWARD_CREATED",
          referenceId: challengeId,
          metadata: {
            amount: rewardAmount,
            currency: rewardConfig.currency,
          },
        },
        session
      );

      verificationResult = {
        success: true,
        result,
        reward: {
          currency: rewardConfig.currency,
          amount: rewardAmount,
        },
      };
    });

    return verificationResult;
  } finally {
    await session.endSession();
  }
};

export const claimReward = async ({
  userId,
  challengeId,
}) => {
  if (!challengeId) {
    throw new Error("Challenge ID is required.");
  }

  const challenge =
    await findCaptchaChallengeByIdAndUserId(
      challengeId,
      userId
    );

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  if (challenge.status !== "COMPLETED") {
    throw new Error(
      "Challenge has not been completed."
    );
  }

  if (challenge.rewardStatus === "CLAIMED") {
    throw new Error(
      "This reward has already been claimed."
    );
  }

  const claimedChallenge =
    await claimCaptchaReward(
      challengeId,
      userId
    );

  if (!claimedChallenge) {
    throw new Error(
      "This reward has already been claimed."
    );
  }

  await createAuditLog({
    userId,
    action: "REWARD_CLAIMED",
    referenceId: challengeId,
  });

  return {
    success: true,
    message: "Reward claimed successfully.",
  };
};

export const noThanks = async ({
  userId,
  challengeId,
}) => {
  if (!challengeId) {
    throw new Error("Challenge ID is required.");
  }

  const challenge =
    await findCaptchaChallengeByIdAndUserId(
      challengeId,
      userId
    );

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  if (
    challenge.status !== "ACTIVE" &&
    challenge.status !== "COMPLETED"
  ) {
    throw new Error("Challenge cannot be discarded.");
  }

  await discardCaptchaChallenge(
    challengeId,
    userId
  );

  return createChallenge(userId);
};

export const getCaptchaHistory = async (userId) => {
  const history = await findCaptchaHistoryByUserId(userId);

  return history.map((challenge) => ({
    challengeId: challenge.challengeId,
    result: challenge.result,
    reward: challenge.rewardAmount,
    rewardStatus: challenge.rewardStatus,
    createdAt: challenge.createdAt,
    completedAt: challenge.completedAt,
  }));
};