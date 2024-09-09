import mongoose from "mongoose";
import User from "../models/user";
import validator from "validator";
/**
 * Service function to create a new user.
 * Validates the user data and saves it to the database.
 *
 * @param userData - The data of the user to be created
 * @returns The created user document
 * @throws Error if validation fails or user creation is unsuccessful
 */
const createUser = async (userData) => {
    if (!userData.name || typeof userData.name !== "string") {
        throw new Error("Invalid or missing name");
    }
    // Validate email
    if (!userData.email ||
        (userData.email && !validator.isEmail(userData.email))) {
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
    }
    catch (error) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
};
/**
 * Service function to find a user by either their ID or name.
 *
 * @param userIdOrName - The ID or name of the user to find
 * @returns The found user document
 * @throws Error if the user is not found or if an error occurs during the search
 */
const findOneByNameOrId = async (userIdOrName) => {
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
    }
    catch (error) {
        throw new Error("Error in findOneByNameOrId: " + error.message);
    }
};
/**
 * Service function to retrieve all users from the database.
 *
 * @returns An array of user documents
 * @throws Error if no users are found
 */
const getAllUsers = async () => {
    const users = await User.find();
    if (!users) {
        throw new Error("No User found");
    }
    return users;
};
// Export the service functions for use in controllers
export default { createUser, findOneByNameOrId, getAllUsers };
