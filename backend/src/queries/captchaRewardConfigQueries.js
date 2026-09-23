import CaptchaRewardConfig from "../models/CaptchaRewardConfig.js";

export const findActiveCaptchaRewardConfig = async () => {
  return CaptchaRewardConfig.findOne({
    active: true,
  }).sort({
    createdAt: -1,
  });
};

export const createCaptchaRewardConfig = async ({
  correctReward,
  wrongReward,
  currency,
  active,
}) => {
  return CaptchaRewardConfig.create({
    correctReward,
    wrongReward,
    currency,
    active,
  });
};