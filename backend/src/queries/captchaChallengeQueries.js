import CaptchaChallenge from "../models/CaptchaChallenge.js";

export const createCaptchaChallenge = async (
  challengeData,
  session = null
) => {
  if (session) {
    const [challenge] = await CaptchaChallenge.create(
      [challengeData],
      { session }
    );

    return challenge;
  }

  return CaptchaChallenge.create(challengeData);
};

export const findActiveCaptchaChallengeByUserId = async (
  userId
) => {
  return CaptchaChallenge.findOne({
    userId,
    status: "ACTIVE",
  }).sort({
    createdAt: -1,
  });
};

export const findCaptchaChallengeByIdAndUserId = async (
  challengeId,
  userId,
  session = null
) => {
  const query = CaptchaChallenge.findOne({
    challengeId,
    userId,
  });

  if (session) {
    query.session(session);
  }

  return query;
};

export const completeCaptchaChallenge = async ({
  challengeId,
  userId,
  selectedOption,
  result,
  rewardAmount,
  session = null,
}) => {
  const query = CaptchaChallenge.findOneAndUpdate(
    {
      challengeId,
      userId,
      status: "ACTIVE",
    },
    {
      $set: {
        selectedOption,
        result,
        rewardAmount,
        rewardStatus: "PENDING",
        status: "COMPLETED",
        completedAt: new Date(),
      },
    },
    {
      new: true,
    }
  );

  if (session) {
    query.session(session);
  }

  return query;
};

export const discardCaptchaChallenge = async (
  challengeId,
  userId
) => {
  return CaptchaChallenge.findOneAndUpdate(
    {
      challengeId,
      userId,
      status: "ACTIVE",
    },
    {
      $set: {
        status: "DISCARDED",
      },
    },
    {
      new: true,
    }
  );
};

export const claimCaptchaReward = async (
  challengeId,
  userId
) => {
  return CaptchaChallenge.findOneAndUpdate(
    {
      challengeId,
      userId,
      status: "COMPLETED",
      rewardStatus: "PENDING",
    },
    {
      $set: {
        rewardStatus: "CLAIMED",
      },
    },
    {
      new: true,
    }
  );
};
export const findCaptchaHistoryByUserId = async (userId) => {
  return CaptchaChallenge.find({
    userId,
    status: "COMPLETED",
  })
    .select(
      "challengeId result rewardAmount rewardStatus createdAt completedAt"
    )
    .sort({
      completedAt: -1,
    });
};