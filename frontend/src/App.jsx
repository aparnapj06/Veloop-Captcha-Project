import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { authApi, captchaApi, walletApi } from "./api";


/* =========================
   GEM / DIAMOND ICON
   ========================= */

const GemIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 3H25L30 9L16 26L2 9L7 3Z"
      fill="url(#gemGradient)"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />

    <path
      d="M2 9H30"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.75"
    />

    <path
      d="M7 3L12 9L16 26"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.55"
    />

    <path
      d="M25 3L20 9L16 26"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.55"
    />

    <path
      d="M12 9H20"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.7"
    />

    <defs>
      <linearGradient
        id="gemGradient"
        x1="6"
        y1="4"
        x2="25"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ffe88a" />
        <stop offset="0.45" stopColor="#f4c43d" />
        <stop offset="1" stopColor="#c79114" />
      </linearGradient>
    </defs>
  </svg>
);

/* =========================
   SHIELD ICON
   ========================= */

const ShieldIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 3L19 6V11.5C19 16.2 16.1 19.5 12 21C7.9 19.5 5 16.2 5 11.5V6L12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />

    <path
      d="M9 12L11 14L15.5 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   CHECK ICON
   ========================= */

const CheckIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12.5L9.5 17L19 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   CHECK CIRCLE ICON
   ========================= */

const CheckCircleIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
    />

    <path
      d="M7.8 12.2L10.5 15L16.4 9.1"
      stroke="#07111D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   REFRESH ICON
   ========================= */

const RefreshIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 11A8.1 8.1 0 0 0 5.4 6.2L4 7.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M4 4V7.5H7.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M4 13A8.1 8.1 0 0 0 18.6 17.8L20 16.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M20 20V16.5H16.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   GIFT ICON
   ========================= */

const GiftIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="4"
      y="9"
      width="16"
      height="11"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M3 9H21V6.5C21 5.67 20.33 5 19.5 5H4.5C3.67 5 3 5.67 3 6.5V9Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M12 5V20"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M12 5C10.6 5 8 4.2 8 2.8C8 1.9 8.8 1.5 9.5 1.5C11 1.5 12 3.3 12 5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />

    <path
      d="M12 5C13.4 5 16 4.2 16 2.8C16 1.9 15.2 1.5 14.5 1.5C13 1.5 12 3.3 12 5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   LIGHTNING ICON
   ========================= */

const LightningIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13.5 2L5 13H11L10.5 22L19 10.5H13L13.5 2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   PHONE ICON
   ========================= */

const PhoneIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="6"
      y="2.5"
      width="12"
      height="19"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <path
      d="M10 5H14"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    <circle
      cx="12"
      cy="18.5"
      r="0.9"
      fill="currentColor"
    />
  </svg>
);

/* =========================
   LOCK ICON
   ========================= */

const LockIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="5"
      y="10"
      width="14"
      height="11"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <path
      d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <circle
      cx="12"
      cy="15.5"
      r="1"
      fill="currentColor"
    />

    <path
      d="M12 16.5V18"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

/* =========================
   SUCCESS CHECK ICON
   ========================= */

const SuccessCheckIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="32"
      cy="32"
      r="27"
      stroke="currentColor"
      strokeWidth="2.5"
    />

    <path
      d="M20 32.5L28 40L45 23"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 7L17 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 7L7 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


/* =========================
   APP
   ========================= */

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authApi.hasToken());
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [challenge, setChallenge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [screenStatus, setScreenStatus] = useState("loading");
  const [walletBalance, setWalletBalance] = useState(null);
  const [previousBalance, setPreviousBalance] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [rewardCurrency, setRewardCurrency] = useState("GEM");
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [pageError, setPageError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [claimPhase, setClaimPhase] = useState(null);

  const loadWallet = useCallback(async () => {
    const data = await walletApi.getBalance();
    const balance = Number(data?.wallet?.balance ?? 0);
    setWalletBalance(balance);
    return balance;
  }, []);

  const loadCurrentCaptcha = useCallback(async () => {
    setPageError("");
    setSelectedOption(null);
    setRewardAmount(null);
    setRewardClaimed(false);
    setClaimPhase(null);
    setPreviousBalance(null);
    setScreenStatus("loading");

    try {
      const data = await captchaApi.getCurrent();

      if (!data?.captcha?.challengeId || !Array.isArray(data?.captcha?.options)) {
        throw new Error("The backend returned an invalid CAPTCHA challenge.");
      }

      setChallenge(data.captcha);
      setScreenStatus("challenge");
      await loadWallet();
    } catch (error) {
      if (error.status === 401) {
        authApi.logout();
        setIsAuthenticated(false);
        setScreenStatus("loading");
        return;
      }

      setPageError(error.message);
      setScreenStatus("error");
    }
  }, [loadWallet]);

  const loadNewCaptcha = useCallback(async () => {
    setPageError("");
    setActionLoading(true);
    setSelectedOption(null);
    setClaimPhase(null);

    try {
      const data = await captchaApi.newChallenge();

      if (!data?.captcha?.challengeId) {
        throw new Error("The backend did not return a new CAPTCHA.");
      }

      setChallenge(data.captcha);
      setRewardAmount(null);
      setRewardClaimed(false);
      setPreviousBalance(null);
      setScreenStatus("challenge");
    } catch (error) {
      if (error.status === 401) {
        authApi.logout();
        setIsAuthenticated(false);
        return;
      }

      setPageError(error.message);
    } finally {
      setActionLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    loadCurrentCaptcha();
  }, [isAuthenticated, loadCurrentCaptcha]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    setAuthError("");

    const email = authEmail.trim();

    if (!email || !authPassword) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "login") {
        await authApi.login(email, authPassword);
      } else {
        await authApi.register(email, authPassword);
      }

      setAuthEmail("");
      setAuthPassword("");
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    setChallenge(null);
    setWalletBalance(null);
    setSelectedOption(null);
    setScreenStatus("loading");
    setPageError("");
  };

  const handleOptionSelect = (option) => {
    if (
      screenStatus !== "challenge" ||
      !challenge?.challengeId ||
      selectedOption ||
      actionLoading
    ) {
      return;
    }

    setSelectedOption(option);
    setPageError("");
  };

  const handleSubmit = async () => {
    if (
      screenStatus !== "challenge" ||
      !challenge?.challengeId ||
      !selectedOption ||
      actionLoading
    ) {
      return;
    }

    setPageError("");
    setScreenStatus("verifying");

    try {
      // The frontend sends only the challenge ID and selected option.
      // Correctness and reward are decided by the backend.
      const data = await captchaApi.verify(
        challenge.challengeId,
        selectedOption
      );

      const amount = Number(data?.reward?.amount ?? 0);
      const currency = data?.reward?.currency || "GEM";

      setRewardAmount(amount);
      setRewardCurrency(currency);
      setRewardClaimed(false);

      const newBalance = await loadWallet();

      if (Number.isFinite(newBalance)) {
        setPreviousBalance(newBalance - amount);
      }

      if (data?.result === "CORRECT") {
        setScreenStatus("success");
      } else if (data?.result === "WRONG") {
        setScreenStatus("incorrect");
      } else {
        throw new Error("The backend returned an unknown verification result.");
      }

      // Fetch history from the backend so the frontend stays synchronized
      // with the server-side CAPTCHA activity.
      try {
        await captchaApi.history();
      } catch {
        // History is supplementary to the active result screen.
      }
    } catch (error) {
      if (error.status === 401) {
        authApi.logout();
        setIsAuthenticated(false);
        return;
      }

      if (
        error.status === 410 ||
        error.code === "CHALLENGE_EXPIRED"
      ) {
        setPageError(
          "This CAPTCHA expired. A new challenge is being loaded."
        );
        await loadCurrentCaptcha();
        return;
      }

      if (
        error.status === 409 &&
        error.code === "CHALLENGE_ALREADY_COMPLETED"
      ) {
        setPageError(
          "This CAPTCHA has already been used. Please continue with a new challenge."
        );
        await loadCurrentCaptcha();
        return;
      }

      setSelectedOption(null);
      setScreenStatus("challenge");
      setPageError(error.message);
    }
  };

  const handleClaim = async () => {
    if (
      !challenge?.challengeId ||
      rewardClaimed ||
      actionLoading ||
      claimPhase
    ) {
      return;
    }

    setActionLoading(true);
    setPageError("");

    try {
      await captchaApi.claim(challenge.challengeId);

      setRewardClaimed(true);

      // Development/demo-only mock rewarded-ad state.
      setClaimPhase("preparing");

      window.setTimeout(() => {
        setClaimPhase("ad");
      }, 700);

      window.setTimeout(async () => {
        setClaimPhase("completed");

        try {
          await loadNewCaptcha();
        } catch {
          // loadNewCaptcha already handles its own UI error state.
        }
      }, 2200);
    } catch (error) {
      if (error.status === 401) {
        authApi.logout();
        setIsAuthenticated(false);
        return;
      }

      if (
        error.status === 409 &&
        error.code === "REWARD_ALREADY_CLAIMED"
      ) {
        setRewardClaimed(true);
        setPageError("This reward has already been claimed.");
      } else {
        setPageError(error.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleNoThanks = async () => {
    if (!challenge?.challengeId || actionLoading) {
      return;
    }

    setActionLoading(true);
    setPageError("");

    try {
      const data = await captchaApi.noThanks(challenge.challengeId);

      if (!data?.captcha?.challengeId) {
        throw new Error("The backend did not return a new CAPTCHA.");
      }

      setChallenge(data.captcha);
      setSelectedOption(null);
      setRewardAmount(null);
      setRewardClaimed(false);
      setPreviousBalance(null);
      setClaimPhase(null);
      setScreenStatus("challenge");
    } catch (error) {
      if (error.status === 401) {
        authApi.logout();
        setIsAuthenticated(false);
        return;
      }

      setPageError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const formatGemAmount = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "0";
    }

    return numericAmount.toFixed(2).replace(/\.00$/, "");
  };

  const formatBalance = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "—";
    }

    return numericAmount.toFixed(2);
  };

  const renderAuthScreen = () => (
    <section className="captcha-phone">
      <div className="phone-top">
        <div className="phone-brand">
          <span>VELOOP</span>
          <small>REWARDS</small>
        </div>
      </div>

      <div
        className="captcha-content"
        style={{
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 className="earn-title">
          <span className="earn-white">
            {authMode === "login" ? "Welcome" : "Create"}
          </span>{" "}
          <span className="earn-gold">
            {authMode === "login" ? "Back" : "Account"}
          </span>
        </h2>

        <p className="captcha-description">
          {authMode === "login"
            ? "Sign in to continue earning Gems."
            : "Create your VELoop account to start earning."}
        </p>

        <form
          onSubmit={handleAuthSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "18px",
          }}
        >
          <input
            type="email"
            value={authEmail}
            onChange={(event) => setAuthEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            disabled={authLoading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none",
            }}
          />

          <input
            type="password"
            value={authPassword}
            onChange={(event) => setAuthPassword(event.target.value)}
            placeholder="Password"
            autoComplete={
              authMode === "login" ? "current-password" : "new-password"
            }
            disabled={authLoading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none",
            }}
          />

          {authError && (
            <p
              role="alert"
              style={{
                margin: "2px 0",
                color: "#ff8f8f",
                fontSize: "13px",
                lineHeight: 1.45,
              }}
            >
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="add-balance-button"
            style={{
              marginTop: "4px",
              opacity: authLoading ? 0.65 : 1,
              cursor: authLoading ? "wait" : "pointer",
            }}
          >
            {authLoading
              ? "Please wait..."
              : authMode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setAuthMode((current) =>
              current === "login" ? "register" : "login"
            );
            setAuthError("");
          }}
          disabled={authLoading}
          style={{
            marginTop: "16px",
            background: "transparent",
            border: 0,
            color: "#f4c43d",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          {authMode === "login"
            ? "Need an account? Register"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );

  const renderClaimPhase = () => {
    if (!claimPhase) {
      return null;
    }

    const phaseText = {
      preparing: {
        title: "Preparing Reward",
        text: "Getting your reward ready...",
      },
      ad: {
        title: "Mock Rewarded Ad",
        text: "Development/demo state — no real ad network is used.",
      },
      completed: {
        title: "Reward Completed",
        text: "Loading your next CAPTCHA...",
      },
    };

    const phase = phaseText[claimPhase];

    return (
      <div
        role="status"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "rgba(3, 10, 18, 0.82)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: "min(420px, 100%)",
            padding: "28px",
            borderRadius: "20px",
            border: "1px solid rgba(244,196,61,0.25)",
            background: "#07111D",
            boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
            textAlign: "center",
          }}
        >
          <GemIcon
            className="reward-diamond"
            style={{ width: "48px", height: "48px" }}
          />
          <h2
            style={{
              margin: "18px 0 8px",
              color: "#fff",
              fontSize: "22px",
            }}
          >
            {phase.title}
          </h2>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.5,
              fontSize: "14px",
            }}
          >
            {phase.text}
          </p>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <main className="app-shell">
        <section className="reference-frame">
          <header className="brand-header">
            <div className="brand-mark">
              <GemIcon className="brand-diamond" />
              <span className="brand-name">VELOOP REWARDS</span>
            </div>

            <h1>CAPTCHA FLOW</h1>

            <p className="brand-subtitle">
              Secure Verification • Earn Rewards • Build Trust
            </p>
          </header>

          {renderAuthScreen()}
        </section>
      </main>
    );
  }

  const captchaText = challenge?.captchaText || "";
  const options = Array.isArray(challenge?.options)
    ? challenge.options
    : [];

  return (
    <main className="app-shell">
      <section className="reference-frame">

        {/* =========================
            BRAND HEADER
            ========================= */}

        <header className="brand-header">
          <div className="brand-mark">
            <GemIcon className="brand-diamond" />

            <span className="brand-name">
              VELOOP REWARDS
            </span>
          </div>

          <h1>CAPTCHA FLOW</h1>

          <p className="brand-subtitle">
            Secure Verification • Earn Rewards • Build Trust
          </p>
        </header>

        {/* =========================
            CAPTCHA CARD
            ========================= */}

        <section className="captcha-phone">

          {/* Phone Header */}

          <div className="phone-top">

            <button
              className="back-button"
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign out"
            >
              ‹
            </button>

            <div className="phone-brand">
              <span>VELOOP</span>
              <small>REWARDS</small>
            </div>

            <div className="gem-badge">

              <GemIcon className="gem-diamond" />

              <span>
                {formatBalance(walletBalance)}
              </span>

            </div>

          </div>

          {/* =========================
              MAIN CONTENT
              ========================= */}

          <div className="captcha-content">

            {screenStatus === "loading" ? (

              <div className="verifying-screen">
                <div className="verifying-icon">
                  <span className="verify-ring verify-ring-1" />
                  <span className="verify-ring verify-ring-2" />
                  <span className="verify-ring verify-ring-3" />
                  <div className="verify-lock">
                    <LockIcon />
                  </div>
                </div>

                <h2 className="verifying-title">
                  Loading...
                </h2>

                <p className="verifying-text">
                  Please wait while we
                  <br />
                  load your CAPTCHA.
                </p>

                <div className="verification-note">
                  <ShieldIcon className="verification-note-icon" />
                  <span>
                    Your challenge is supplied
                    <br />
                    by the secure backend.
                  </span>
                </div>
              </div>

            ) : screenStatus === "error" ? (

              <div className="incorrect-screen">
                <div className="incorrect-hero">
                  <span className="incorrect-ring incorrect-ring-outer" />
                  <span className="incorrect-ring incorrect-ring-inner" />
                  <div className="incorrect-check">
                    <CloseIcon />
                  </div>
                </div>

                <h2 className="incorrect-title">
                  Unable to Load
                </h2>

                <p className="incorrect-text">
                  {pageError || "Something went wrong."}
                </p>

                <div className="incorrect-actions">
                  <button
                    type="button"
                    className="try-again-button"
                    onClick={loadCurrentCaptcha}
                  >
                    Try Again
                  </button>
                </div>
              </div>

            ) : screenStatus === "success" ? (

              <div className="success-screen">

                <div className="success-hero">

                  <span className="success-particle particle-1" />
                  <span className="success-particle particle-2" />
                  <span className="success-particle particle-3" />
                  <span className="success-particle particle-4" />
                  <span className="success-particle particle-5" />
                  <span className="success-particle particle-6" />
                  <span className="success-particle particle-7" />
                  <span className="success-particle particle-8" />

                  <div className="success-ring success-ring-outer" />
                  <div className="success-ring success-ring-middle" />
                  <div className="success-ring success-ring-inner">

                    <div className="success-check">
                      <SuccessCheckIcon />
                    </div>

                  </div>

                </div>

                <h2 className="success-title">
                  Verification Complete!
                </h2>

                <p className="success-text">
                  You earned
                </p>

                <div className="success-reward">
                  <GemIcon className="reward-diamond" />
                  <span>
                    +{formatGemAmount(rewardAmount)} Gem
                  </span>
                </div>

                <div className="balance-card">

                  <div className="balance-side">
                    <strong>
                      {formatBalance(previousBalance)}
                    </strong>
                    <span>Previous Balance</span>
                  </div>

                  <div className="balance-arrow">
                    →
                  </div>

                  <div className="balance-side">
                    <strong>
                      {formatBalance(walletBalance)}
                    </strong>
                    <span>New Balance</span>
                  </div>

                </div>

                <div className="success-actions">

                  <button
                    type="button"
                    className="add-balance-button"
                    onClick={handleClaim}
                    disabled={actionLoading || rewardClaimed || Boolean(claimPhase)}
                  >
                    {rewardClaimed ? "Reward Claimed" : "Add to Balance"}
                  </button>

                  <button
                    type="button"
                    className="maybe-later-button"
                    onClick={handleNoThanks}
                    disabled={actionLoading || Boolean(claimPhase)}
                  >
                    May be Later
                  </button>

                </div>

                <div className="success-note">

                  <ShieldIcon className="success-note-icon" />

                  <span>
                      Your reward has been addedd to your account.
                  </span>

                </div>

                {pageError && (
                  <p
                    role="alert"
                    style={{
                      marginTop: "14px",
                      color: "#ff8f8f",
                      fontSize: "13px",
                    }}
                  >
                    {pageError}
                  </p>
                )}

              </div>

            ) : screenStatus === "incorrect" ? (

              <div className="incorrect-screen">

                <div className="incorrect-hero">

                  <span className="incorrect-particle incorrect-particle-1" />
                  <span className="incorrect-particle incorrect-particle-2" />
                  <span className="incorrect-particle incorrect-particle-3" />
                  <span className="incorrect-particle incorrect-particle-4" />
                  <span className="incorrect-particle incorrect-particle-5" />
                  <span className="incorrect-particle incorrect-particle-6" />
                  <span className="incorrect-particle incorrect-particle-7" />
                  <span className="incorrect-particle incorrect-particle-8" />

                  <span className="incorrect-ring incorrect-ring-outer" />
                  <span className="incorrect-ring incorrect-ring-inner" />

                  <div className="incorrect-check">
                    <CloseIcon />
                  </div>

                </div>

                <h2 className="incorrect-title">
                  Verification Unsuccessful
                </h2>

                <p className="incorrect-text">
                  The selected code does not match.
                  <br />
                  the image shown.
                  <br /><br /><br />
                  Please try again with 
                  <br />
                  a new challenge.
                </p>

                

                <div className="incorrect-actions">

                  <button
                    type="button"
                    className="try-again-button"
                    onClick={loadNewCaptcha}
                    disabled={actionLoading}
                  >
                    Try Again
                  </button>

                  <button
                    type="button"
                    className="get-new-code-button"
                    onClick={loadNewCaptcha}
                    disabled={actionLoading}
                  >
                    <RefreshIcon className="refresh-icon" />

                    <span>    Get New Code</span>
                  </button>

                </div>

                <div className="incorrect-note">

                  <ShieldIcon className="incorrect-note-icon" />

                  <span>
                    Security checks keep your
                    <br />
                    account safe.
                  </span>

                </div>

                {pageError && (
                  <p
                    role="alert"
                    style={{
                      marginTop: "14px",
                      color: "#ff8f8f",
                      fontSize: "13px",
                    }}
                  >
                    {pageError}
                  </p>
                )}

              </div>

            ) : screenStatus === "verifying" ? (

              /* =========================
                 VERIFYING
                 ========================= */

              <div className="verifying-screen">

                <div className="verifying-icon">

                  <span className="verify-ring verify-ring-1" />

                  <span className="verify-ring verify-ring-2" />

                  <span className="verify-ring verify-ring-3" />

                  <div className="verify-lock">
                    <LockIcon />
                  </div>

                </div>

                <h2 className="verifying-title">
                  Verifying...
                </h2>

                <p className="verifying-text">
                  Please wait while we
                  <br />
                  check your answer.
                </p>

                <div className="verify-progress">
                  <span />
                </div>

                <div className="verification-divider" />

                <div className="verification-note">

                  <ShieldIcon
                    className="verification-note-icon"
                  />

                  <span>
                    Do not close this screen
                    <br />
                    while verificationis in progress.
                  </span>

                </div>

              </div>

            ) : (

              /* =========================
                 CHALLENGE / SELECTED
                 ========================= */

              <>

                <h2 className="earn-title">

                  <span className="earn-white">
                    Earn
                  </span>{" "}

                  <span className="earn-gold">
                    Gems
                  </span>

                </h2>

                <p className="captcha-description">
                  Complete a quick security check
                  <br />
                  to earn rewards.
                </p>

                {/* CAPTCHA CODE + NEW CODE */}

                <div className="captcha-code">

                  <div className="captcha-characters">

                    {captchaText
                      .split("")
                      .map((character, index) => (
                        <span
                          key={`${character}-${index}`}
                        >
                          {character}
                        </span>
                      ))}

                  </div>

                  <button
                    type="button"
                    className="new-code-button"
                    onClick={loadNewCaptcha}
                    disabled={actionLoading}
                  >
                    <RefreshIcon
                      className="refresh-icon"
                    />

                    <span>
                      New Code
                    </span>
                  </button>

                </div>

                <p className="option-label">
                  Select the matching code
                </p>

                {/* OPTIONS */}

                <div className="option-grid">

                  {options.map((option) => {

                    const isSelected =
                      selectedOption === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`captcha-option ${
                          isSelected
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionSelect(option)
                        }
                        disabled={
                          Boolean(selectedOption) ||
                          actionLoading
                        }
                        aria-pressed={isSelected}
                      >

                        <span className="option-text">
                          {option}
                        </span>

                        {isSelected && (
                          <CheckCircleIcon
                            className="option-check-circle"
                          />
                        )}

                      </button>
                    );
                  })}

                </div>

                {selectedOption && (
                  <button
                    type="button"
                    className="submit-answer"
                    onClick={handleSubmit}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Checking..." : "Submit Answer"}
                  </button>
                )}

                {/* SECURITY */}

                <div className="security-note">

                  <ShieldIcon
                    className="shield-icon"
                  />

                  <span>
                    This helps protect your account
                    <br />
                    from automated access.
                  </span>

                </div>

                {/* REWARD */}

                <div className="reward-note">

                  <GemIcon
                    className="reward-diamond"
                  />

                  <span>
                    Complete verification to earn
                  </span>

                  <strong>
                    +1 Gem
                  </strong>

                </div>

                {pageError && (
                  <p
                    role="alert"
                    style={{
                      marginTop: "14px",
                      color: "#ff8f8f",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    {pageError}
                  </p>
                )}

              </>

            )}

          </div>

        </section>

        {/* =========================
            FEATURE STRIP
            ========================= */}

        <section className="feature-strip">

          <div className="feature-item">

            <ShieldIcon
              className="feature-icon secure-icon"
            />

            <div>

              <strong>
                SECURE
              </strong>

              <small>
                Advanced protection
                <br />
                for your account
              </small>

            </div>

          </div>

          <div className="feature-item">

            <GiftIcon
              className="feature-icon rewarding-icon"
            />

            <div>

              <strong>
                REWARDING
              </strong>

              <small>
                Earn Gems for completing
                <br />
                verification
              </small>

            </div>

          </div>

          <div className="feature-item">

            <LightningIcon
              className="feature-icon fast-icon"
            />

            <div>

              <strong>
                FAST
              </strong>

              <small>
                Quick verification
                <br />
                and rewards
              </small>

            </div>

          </div>

      
          <div className="feature-item">

            <LockIcon
              className="feature-icon trusted-icon"
            />

            <div>

              <strong>
                TRUSTED
              </strong>

              <small>
                Your security is
                <br />
                our priority
              </small>

            </div>

          </div>
          
          <div className="feature-item">

            <PhoneIcon
              className="feature-icon mobile-icon"
            />

            <div>

              <strong>
                MOBILE FIRST
              </strong>

              <small>
                Optimized experience
                <br />
                on every device
              </small>

            </div>

          </div>

        </section>

      </section>
      {renderClaimPhase()}
    </main>
  );
}

export default App;
