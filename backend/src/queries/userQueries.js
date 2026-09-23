import User from "../models/User.js";

export const createUser = async ({ email, passwordHash }) => {
  return User.create({
    email,
    passwordHash,
  });
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserById = async (userId) => {
  return User.findById(userId);
};