// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import Routes from "./routes/index";
import cors from "cors";
import logger from "./middleware/logger";
import path from "path";
import fs from "fs";
import { marked } from "marked";

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);
// app.use(logger);

// ES6 way to get __dirname
const __dirname = path.dirname(__filename);

// Route to serve README.md content as HTML
app.get("/", (req, res) => {
  const readmePath = path.join(__dirname, "../README.md");

  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading README.md:", err);
      res.status(500).send("Error reading README.md");
      return;
    }
    // Convert Markdown to HTML
    const htmlContent = marked(data);
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  });
});

app.use("/api", Routes);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
