import { Request, Response } from "express";
import bookService from "../services/bookService";

/**
 * Controller function to create a new book.
 * Handles the HTTP request and response for creating a book.
 */
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const book = await bookService.createBook(bookData);
    res
      .status(201)
      .json({ success: true, message: "Book created successfully", book });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller function to retrieve books based on query parameters.
 * Handles the HTTP request and response for fetching books.
 */
const getBooks = async (req: Request, res: Response) => {
  try {
    const query: any = req.query;
    const books = await bookService.findBooks(query);
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions for use in routes
export default { createBook, getBooks };
