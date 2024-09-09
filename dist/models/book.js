// src/models/book.ts
import mongoose, { Schema } from "mongoose";
const BookSchema = new Schema({
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
});
const Book = mongoose.model("Book", BookSchema);
export default Book;
