"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const bookRoute_1 = __importDefault(require("./bookRoute"));
const transactionRoutes_1 = __importDefault(require("./transactionRoutes"));
const router = express_1.default.Router();
router.use("/user", userRoute_1.default);
router.use("/book", bookRoute_1.default);
router.use("/transaction", transactionRoutes_1.default);
exports.default = router;
