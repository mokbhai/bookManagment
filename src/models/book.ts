// src/models/book.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  bookName: string;
  category: string;
  rentPerDay: number;
}

const BookSchema = new Schema({
  bookName: { type: String, required: true },
  category: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
