// src/components/TransactionForm.js
import React, { useState } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [bookName, setBookName] = useState("");
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("issue");

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint =
      action === "issue"
        ? "/api/transactions/issue"
        : "/api/transactions/return";
    axios
      .post(endpoint, { bookName, userId, issueDate: new Date() })
      .then((response) => alert("Transaction successful!"))
      .catch((error) => console.error("Error processing transaction:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{action === "issue" ? "Issue Book" : "Return Book"}</h2>
      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="issue">Issue</option>
        <option value="return">Return</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;
