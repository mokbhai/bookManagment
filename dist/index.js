"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./middleware/logger"));
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Frontend URL
}));
app.use(logger_1.default);
app.get("/api", (req, res) => {
    res.send("Library Managment System");
});
// Use your defined routes
app.use("/api", index_1.default);
// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: "API endpoint not found" });
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
