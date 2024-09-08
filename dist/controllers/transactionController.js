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
const transactionService_1 = __importDefault(require("../services/transactionService"));
const issueBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issueData = req.body;
        const transaction = yield transactionService_1.default.issueBook(issueData);
        res.status(201).json({
            success: true,
            message: "Book issued successfully",
            transaction,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnData = req.body;
        const transaction = yield transactionService_1.default.returnBook(returnData);
        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            transaction,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const bookStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookName = req.body;
        const transactions = yield transactionService_1.default.bookStatus(bookName);
        res.status(200).json({
            success: true,
            message: "Book Status: ",
            transactions,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const createDummyTransations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transactionService_1.default.createDummyTransations();
        res.status(201).json(transactions);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = { issueBook, returnBook, createDummyTransations, bookStatus };
