"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const validator_1 = __importDefault(require("validator"));
/**
 * Service function to create a new user.
 * Validates the user data and saves it to the database.
 *
 * @param userData - The data of the user to be created
 * @returns The created user document
 * @throws Error if validation fails or user creation is unsuccessful
 */
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData.name || typeof userData.name !== "string") {
        throw new Error("Invalid or missing name");
    }
    // Validate email
    if (!userData.email ||
        (userData.email && !validator_1.default.isEmail(userData.email))) {
        throw new Error("Invalid email format");
    }
    // Validate phone if provided
    if (userData.phone && typeof userData.phone !== "string") {
        throw new Error("Invalid phone format");
    }
    try {
        const user = new user_1.default(userData);
        yield user.save();
        return user;
    }
    catch (error) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
});
/**
 * Service function to find a user by either their ID or name.
 *
 * @param userIdOrName - The ID or name of the user to find
 * @returns The found user document
 * @throws Error if the user is not found or if an error occurs during the search
 */
const findOneByNameOrId = (userIdOrName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = mongoose_1.default.Types.ObjectId.isValid(userIdOrName)
            ? new mongoose_1.default.Types.ObjectId(userIdOrName)
            : null;
        const user = yield user_1.default.findOne({
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
});
/**
 * Service function to retrieve all users from the database.
 *
 * @returns An array of user documents
 * @throws Error if no users are found
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    if (!users) {
        throw new Error("No User found");
    }
    return users;
});
// Export the service functions for use in controllers
exports.default = { createUser, findOneByNameOrId, getAllUsers };
