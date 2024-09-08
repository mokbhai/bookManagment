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
// src/services/transactionService.ts
const transaction_1 = __importDefault(require("../models/transaction"));
const bookService_1 = __importDefault(require("./bookService"));
const userService_1 = __importDefault(require("./userService"));
const issueBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the book by name
        const book = yield bookService_1.default.findOneByName(data.bookName);
        // Find the user by userId or name
        const user = yield userService_1.default.findOneByNameOrId(data.userIdOrName);
        // Create a new transaction
        const transaction = new transaction_1.default({
            bookId: book._id,
            userId: user._id,
            issueDate: new Date(data.issueDate),
        });
        yield transaction.save();
        return transaction;
    }
    catch (error) {
        throw new Error(`Unable to issue book: ${error.message}`);
    }
});
const returnBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the book by name
        const book = yield bookService_1.default.findOneByName(data.bookName);
        // Find the user by userId or name
        const user = yield userService_1.default.findOneByNameOrId(data.userIdOrName);
        // find transaction
        const transaction = yield transaction_1.default.findOne({
            bookId: book._id,
            userId: user._id,
            returnDate: { $exists: false }, // Ensure the book hasn't been returned yet
        });
        if (!transaction) {
            throw new Error("Transaction not found or book already returned");
        }
        transaction.returnDate = new Date();
        transaction.totalRent = calculateTotalRent(transaction.issueDate, transaction.returnDate, book.rentPerDay);
        yield transaction.save();
        return transaction;
    }
    catch (error) {
        throw new Error(`Unable to return book: ${error.message}`);
    }
});
const bookStatus = (bookName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookName) {
        throw new Error("Book name is required");
    }
    try {
        // Find all transactions for the given book name
        const transactions = yield transaction_1.default.find({ bookName });
        if (transactions.length === 0)
            throw new Error("No transactions found for this book: " + bookName);
        // Find currently issued transaction (where returnDate is null)
        const currentlyIssued = transactions.find((transaction) => !transaction.returnDate);
        // Get list of all users who have issued the book
        const usersWhoIssued = transactions.map((transaction) => transaction.userId);
        return {
            totalIssuedCount: transactions.length,
            currentlyIssued: currentlyIssued
                ? currentlyIssued.userId
                : "Not issued at the moment",
            usersWhoIssued,
        };
    }
    catch (error) {
        throw new Error("Error in fetching bookStatus: " + error.message);
    }
});
// Helper function to calculate total rent
const calculateTotalRent = (issueDate, returnDate, rentPerDay) => {
    const daysRented = Math.ceil((returnDate.getTime() - issueDate.getTime()) / (1000 * 3600 * 24));
    return daysRented * rentPerDay;
};
// If you want to create some dummy transactions (i.e issue books and return them)
const createDummyTransations = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield bookService_1.default.findBooks();
    const users = yield userService_1.default.getAllUsers();
    const generateIssueDate = () => {
        return new Date();
    };
    const transactions = [];
    const returnTransactions = [];
    for (let i = 0; i < 40; i++) {
        const book = books[i % books.length];
        const user = users[i % users.length];
        const issueDate = generateIssueDate();
        const issueTransaction = {
            bookName: book.bookName,
            userIdOrName: user.name,
            issueDate: issueDate,
        };
        const returnTransaction = {
            bookName: book.bookName,
            userIdOrName: user.name,
            returnDate: new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000), // Assuming a 7-day rental period
        };
        transactions.push(issueTransaction);
        returnTransactions.push(returnTransaction);
    }
    return { transactions, returnTransactions };
});
exports.default = { issueBook, returnBook, createDummyTransations, bookStatus };
