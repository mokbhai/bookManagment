// src/components/BookList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/book/list")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Book List
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Rent Per Day
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.bookName}
                </th>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">{book.rentPerDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
