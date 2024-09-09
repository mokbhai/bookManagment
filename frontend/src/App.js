// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import TransactionForm from "./components/TransactionForm";

const App = () => {
  return (
    <Router>
      <div className="bg-black dark:bg-gray-700">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/transactions" element={<TransactionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
