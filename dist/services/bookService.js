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
// src/services/bookService.ts
const book_1 = __importDefault(require("../models/book"));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_1.default(bookData);
        yield book.save();
        return book;
    }
    catch (error) {
        throw new Error(`Unable to create book: ${error.message}`);
    }
});
const findBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query && query.term) {
        filter.bookName = new RegExp(query.term, "i");
    }
    if (query && query.minRent !== undefined && query.maxRent !== undefined) {
        filter.rentPerDay = {
            $gte: Number(query.minRent),
            $lte: Number(query.maxRent),
        };
    }
    if (query && query.category) {
        filter.category = query.category;
    }
    return yield book_1.default.find(filter);
});
const findOneByName = (bookName) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the book by name
    const book = yield book_1.default.findOne({ bookName: new RegExp(bookName, "i") });
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
});
exports.default = { createBook, findBooks, findOneByName };
