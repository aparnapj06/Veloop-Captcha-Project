import mongoose from "mongoose";

const captchaChallengeSchema = new mongoose.Schema({
  challengeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  captchaText: {
    type: String,
    required: true,
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length === 4,
      message: "A CAPTCHA challenge must contain exactly 4 options.",
    },
  },

  correctOption: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "DISCARDED"],
    default: "ACTIVE",
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  selectedOption: {
    type: String,
    default: null,
  },

  result: {
    type: String,
    enum: ["CORRECT", "WRONG"],
    default: null,
  },

  rewardAmount: {
    type: Number,
    default: null,
    min: 0,
  },

  rewardStatus: {
    type: String,
    enum: ["PENDING", "CLAIMED"],
    default: "PENDING",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },

  completedAt: {
    type: Date,
    default: null,
  },
});

const CaptchaChallenge = mongoose.model(
  "CaptchaChallenge",
  captchaChallengeSchema
);

export default CaptchaChallenge;