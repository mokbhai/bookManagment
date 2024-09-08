// src/services/userService.ts
import mongoose from "mongoose";
import User, { IUser } from "../models/user";
import validator from "validator";

const createUser = async (userData: IUser) => {
  if (!userData.name || typeof userData.name !== "string") {
    throw new Error("Invalid or missing name");
  }

  // Validate email
  if (
    !userData.email ||
    (userData.email && !validator.isEmail(userData.email))
  ) {
    throw new Error("Invalid email format");
  }

  // Validate phone if provided
  if (userData.phone && typeof userData.phone !== "string") {
    throw new Error("Invalid phone format");
  }

  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(`Unable to create user: ${error.message}`);
  }
};

const findOneByNameOrId = async (userIdOrName: string) => {
  try {
    const userId = mongoose.Types.ObjectId.isValid(userIdOrName)
      ? new mongoose.Types.ObjectId(userIdOrName)
      : null;

    const user = await User.findOne({
      $or: [{ _id: userId }, { name: new RegExp(userIdOrName, "i") }],
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error("Error in findOneByNameOrId: " + error.message);
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("No User found");
  }
  return users;
};

export default { createUser, findOneByNameOrId, getAllUsers };
