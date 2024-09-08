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
exports.getBooksByDateRange = exports.getBooksByUser = void 0;
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
        const bookName = req.query.bookName;
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
const bookRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookName = req.query.bookName;
        const amount = yield transactionService_1.default.bookRevenue(bookName);
        res.status(200).json({
            success: true,
            message: bookName + " Book Revenue: ",
            amount,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getBooksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userIdOrName } = req.query;
        if (!userIdOrName) {
            res.status(400).json({ message: "User ID or name is required" });
            return;
        }
        const books = yield transactionService_1.default.getBooksIssuedToUser(userIdOrName);
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBooksByUser = getBooksByUser;
const getBooksByDateRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            res.status(400).json({ message: "Start date and end date are required" });
            return;
        }
        const books = yield transactionService_1.default.getBooksIssuedInDateRange(new Date(startDate), new Date(endDate));
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBooksByDateRange = getBooksByDateRange;
const createDummyTransations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transactionService_1.default.createDummyTransations();
        res.status(201).json(transactions);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = {
    issueBook,
    returnBook,
    createDummyTransations,
    bookStatus,
    bookRevenue,
    getBooksByDateRange: exports.getBooksByDateRange,
    getBooksByUser: exports.getBooksByUser,
};
