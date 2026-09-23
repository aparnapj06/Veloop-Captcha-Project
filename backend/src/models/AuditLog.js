import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    action: {
      type: String,
      enum: [
        "CHALLENGE_CREATED",
        "CHALLENGE_VERIFIED",
        "REWARD_CREATED",
        "REWARD_CLAIMED",
        "DUPLICATE_ATTEMPT",
        "INVALID_ATTEMPT",
        "EXPIRED_CHALLENGE",
        "SUSPICIOUS_REQUEST",
      ],
      required: true,
    },

    referenceId: {
      type: String,
      default: null,
      trim: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;