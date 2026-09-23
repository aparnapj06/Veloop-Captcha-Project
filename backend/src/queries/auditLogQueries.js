import AuditLog from "../models/AuditLog.js";

export const createAuditLog = async (
  auditData,
  session = null
) => {
  if (session) {
    const [auditLog] = await AuditLog.create(
      [auditData],
      { session }
    );

    return auditLog;
  }

  return AuditLog.create(auditData);
};

export const findAuditLogsByUserId = async (userId) => {
  return AuditLog.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};