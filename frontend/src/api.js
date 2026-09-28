const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/* =========================
   TOKEN HELPERS
   ========================= */

const getToken = () => {
  return sessionStorage.getItem("veloop_token");
};

const saveToken = (token) => {
  sessionStorage.setItem("veloop_token", token);
};

const clearToken = () => {
  sessionStorage.removeItem("veloop_token");
};

/* =========================
   COMMON API REQUEST
   ========================= */

const request = async (path, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = {
      success: false,
      message: "The server returned an invalid response.",
    };
  }

  /* =========================
     UNAUTHORIZED
     ========================= */

  if (response.status === 401) {
    clearToken();
  }

  /* =========================
     API ERROR
     ========================= */

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        "Something went wrong. Please try again."
    );

    error.status = response.status;
    error.code = data?.code;
    error.data = data;

    throw error;
  }

  return data;
};

/* =========================
   AUTH API
   ========================= */

export const authApi = {
  async login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const token = data?.data?.token;

    if (!token) {
      throw new Error(
        "Login succeeded but no authentication token was returned."
      );
    }

    saveToken(token);

    return data.data;
  },

  async register(email, password) {
    const data = await request("/auth/register", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const token = data?.data?.token;

    if (!token) {
      throw new Error(
        "Registration succeeded but no authentication token was returned."
      );
    }

    saveToken(token);

    return data.data;
  },

  logout() {
    clearToken();
  },

  hasToken() {
    return Boolean(getToken());
  },
};

/* =========================
   CAPTCHA API
   ========================= */

export const captchaApi = {
  /* Get current CAPTCHA */

  getCurrent() {
    return request("/captcha/current", {
      method: "GET",
    });
  },

  /* Verify selected CAPTCHA option */

  verify(challengeId, selectedOption) {
    return request("/captcha/verify", {
      method: "POST",

      body: JSON.stringify({
        challengeId,
        selectedOption,
      }),
    });
  },

  /* Claim reward */

  claim(challengeId) {
    return request("/captcha/claim", {
      method: "POST",

      body: JSON.stringify({
        challengeId,
      }),
    });
  },

  /* No Thanks */

  noThanks(challengeId) {
    return request("/captcha/no-thanks", {
      method: "POST",

      body: JSON.stringify({
        challengeId,
      }),
    });
  },

  /* Generate completely new CAPTCHA */

  newChallenge() {
    return request("/captcha/new", {
      method: "POST",
    });
  },

  /* CAPTCHA history */

  history() {
    return request("/captcha/history", {
      method: "GET",
    });
  },
};

/* =========================
   WALLET API
   ========================= */

export const walletApi = {
  getBalance() {
    return request("/wallet/gems", {
      method: "GET",
    });
  },
};