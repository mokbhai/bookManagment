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
const bookService_1 = __importDefault(require("../services/bookService"));
/**
 * Controller function to create a new book.
 * Handles the HTTP request and response for creating a book.
 */
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const book = yield bookService_1.default.createBook(bookData);
        res
            .status(201)
            .json({ success: true, message: "Book created successfully", book });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * Controller function to retrieve books based on query parameters.
 * Handles the HTTP request and response for fetching books.
 */
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const books = yield bookService_1.default.findBooks(query);
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Export the controller functions for use in routes
exports.default = { createBook, getBooks };
