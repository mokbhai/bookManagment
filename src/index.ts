// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import Routes from "./routes/index";
import cors from "cors";
import logger from "./middleware/logger";

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);
app.use(logger);

app.get("/api", (req, res) => {
  res.send("Library Managment System");
});

// Use your defined routes
app.use("/api", Routes);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
