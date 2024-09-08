import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import Routes from "./routes";

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/api", Routes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
