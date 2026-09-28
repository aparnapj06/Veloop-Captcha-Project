import express from "express";
import { rateLimit } from "express-rate-limit";

import {
  getCurrentCaptcha,
  verifyCaptcha,
  claimCaptcha,
  noThanksCaptcha,
  getNewCaptcha,
  getCaptchaHistoryController,
} from "../controllers/captchaController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const captchaRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many CAPTCHA requests. Please try again later.",
  },
});

router.get(
  "/current",
  authenticateUser,
  captchaRateLimiter,
  getCurrentCaptcha
);

router.post(
  "/verify",
  authenticateUser,
  captchaRateLimiter,
  verifyCaptcha
);

router.post(
  "/claim",
  authenticateUser,
  captchaRateLimiter,
  claimCaptcha
);

router.post(
  "/no-thanks",
  authenticateUser,
  noThanksCaptcha
);

router.post(
  "/new",
  authenticateUser,
  captchaRateLimiter,
  getNewCaptcha
);

router.get(
  "/history",
  authenticateUser,
  getCaptchaHistoryController
);

export default router;