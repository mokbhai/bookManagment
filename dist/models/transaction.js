// src/models/transaction.ts
import mongoose, { Schema } from "mongoose";
const TransactionSchema = new Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number },
});
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
