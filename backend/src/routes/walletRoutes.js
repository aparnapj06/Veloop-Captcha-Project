import express from "express";

import { getGemBalance } from "../controllers/walletController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/gems",
  authenticateUser,
  getGemBalance
);

export default router;