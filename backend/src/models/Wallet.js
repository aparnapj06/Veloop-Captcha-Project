import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
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

    balance: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

walletSchema.index(
  {
    userId: 1,
    currency: 1,
  },
  {
    unique: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;