// src/services/bookService.ts
import Book, { IBook } from "../models/book";

interface IQueryBooks {
  term?: string;
  minRent?: number;
  maxRent?: number;
  category?: string;
}

const createBook = async (bookData: IBook) => {
  try {
    const book = new Book(bookData);
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Unable to create book: ${error.message}`);
  }
};

const findBooks = async (query?: IQueryBooks) => {
  const filter: any = {};

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

  return await Book.find(filter);
};

const findOneByName = async (bookName: string) => {
  // Find the book by name
  const book = await Book.findOne({ bookName: new RegExp(bookName, "i") });
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

export default { createBook, findBooks, findOneByName };
