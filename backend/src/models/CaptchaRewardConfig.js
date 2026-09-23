import mongoose from "mongoose";

const captchaRewardConfigSchema = new mongoose.Schema(
  {
    correctReward: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    wrongReward: {
      type: Number,
      required: true,
      min: 0,
      default: 0.5,
    },

    currency: {
      type: String,
      required: true,
      default: "GEMS",
    },

    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaptchaRewardConfig = mongoose.model(
  "CaptchaRewardConfig",
  captchaRewardConfigSchema
);

export default CaptchaRewardConfig;