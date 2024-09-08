const generateIssueDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString(); // Returns the date in ISO 8601 format
};

console.log(generateIssueDate()); // Example output: "2024-09-08T02:12:00.000Z"
