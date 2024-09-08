// src/controllers/transactionController.ts
import { Request, Response } from "express";
import transactionService from "../services/transactionService";

const issueBook = async (req: Request, res: Response) => {
  try {
    const issueData = req.body;
    const transaction = await transactionService.issueBook(issueData);
    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      transaction,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const returnBook = async (req: Request, res: Response) => {
  try {
    const returnData = req.body;
    const transaction = await transactionService.returnBook(returnData);
    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      transaction,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const bookStatus = async (req: Request, res: Response) => {
  try {
    const bookName: any = req.query.bookName;
    const transactions = await transactionService.bookStatus(bookName);
    res.status(200).json({
      success: true,
      message: "Book Status: ",
      transactions,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const bookRevenue = async (req: Request, res: Response) => {
  try {
    const bookName: any = req.query.bookName;
    const amount = await transactionService.bookRevenue(bookName);
    res.status(200).json({
      success: true,
      message: bookName + " Book Revenue: ",
      amount,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const getBooksByUser = async (req: Request, res: Response) => {
  try {
    const { userIdOrName } = req.query;
    if (!userIdOrName) {
      res.status(400).json({ message: "User ID or name is required" });
      return;
    }

    const books = await transactionService.getBooksIssuedToUser(
      userIdOrName as string
    );
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooksByDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ message: "Start date and end date are required" });
      return;
    }

    const books = await transactionService.getBooksIssuedInDateRange(
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createDummyTransations = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.createDummyTransations();
    res.status(201).json(transactions);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  issueBook,
  returnBook,
  createDummyTransations,
  bookStatus,
  bookRevenue,
  getBooksByDateRange,
  getBooksByUser,
};
