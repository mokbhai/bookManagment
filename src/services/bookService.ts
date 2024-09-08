// Import the Book model and IBook interface
import Book, { IBook } from "../models/book";

// Define an interface for query parameters used in finding books
interface IQueryBooks {
  term?: string;
  minRent?: number;
  maxRent?: number;
  category?: string;
}

/**
 * Creates a new book in the database.
 *
 * @param bookData - The data of the book to be created
 * @returns The created book document
 * @throws Error if the book cannot be created
 */
const createBook = async (bookData: IBook) => {
  try {
    const book = new Book(bookData);
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Unable to create book: ${error.message}`);
  }
};

/**
 * Finds books based on query parameters.
 *
 * @param query - The query parameters to filter books
 * @returns An array of books that match the query criteria
 */
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

/**
 * Finds a book by its name.
 *
 * @param bookName - The name of the book to find
 * @returns The found book document
 * @throws Error if the book is not found
 */
const findOneByName = async (bookName: string) => {
  const book = await Book.findOne({ bookName: new RegExp(bookName, "i") });
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

// Export the service functions for use in controllers
export default { createBook, findBooks, findOneByName };
