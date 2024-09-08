// src/models/transaction.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  bookName?: string;
  bookId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  issueDate: Date;
  returnDate?: Date;
  totalRent?: number;
}

const TransactionSchema = new Schema<ITransaction>({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
  totalRent: { type: Number },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export default Transaction;
