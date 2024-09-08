// src/controllers/bookService.ts
import { Request, Response } from "express";
import bookService from "../services/bookService";

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

const getBooks = async (req: Request, res: Response) => {
  try {
    const query: any = req.query;
    const books = await bookService.findBooks(query);
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { createBook, getBooks };
