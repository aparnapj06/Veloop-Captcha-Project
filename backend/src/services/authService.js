import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
} from "../queries/userQueries.js";

import {
  createWallet,
} from "../queries/walletQueries.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const registerUser = async ({
  email,
  password,
}) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  const user = await createUser({
    email,
    passwordHash,
  });

  await createWallet({
    userId: user._id,
    balance: 0,
  });

  const token = generateToken(user);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
    token,
  };
};

export const loginUser = async ({
  email,
  password,
}) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
    token,
  };
};