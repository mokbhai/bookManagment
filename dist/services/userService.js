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
// src/services/userService.ts
const user_1 = __importDefault(require("../models/user"));
const validator_1 = __importDefault(require("validator"));
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
const findOneByNameOrId = (userIdOrName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        $or: [{ userId: userIdOrName }, { name: new RegExp(userIdOrName, "i") }],
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    if (!users) {
        throw new Error("No User found");
    }
    return users;
});
exports.default = { createUser, findOneByNameOrId, getAllUsers };
