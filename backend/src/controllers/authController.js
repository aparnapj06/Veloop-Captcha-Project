import {
  registerUser,
  loginUser,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await registerUser({
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.message === "User already exists.") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error.message === "Invalid email or password.") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};