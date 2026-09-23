import mongoose from "mongoose";

const gemTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
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

    currency: {
      type: String,
      enum: ["GEM"],
      default: "GEM",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["CAPTCHA_REWARD"],
      required: true,
    },

    referenceId: {
      type: String,
      required: true,
      trim: true,
    },

    balanceBefore: {
      type: Number,
      required: true,
      min: 0,
    },

    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["COMPLETED"],
      default: "COMPLETED",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GemTransaction = mongoose.model(
  "GemTransaction",
  gemTransactionSchema
);

export default GemTransaction;