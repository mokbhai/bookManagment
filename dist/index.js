"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const marked_1 = require("marked");
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Frontend URL
}));
// app.use(logger);
// Use __dirname directly in CommonJS
const readmePath = path_1.default.join(__dirname, "../README.md");
// Route to serve README.md content as HTML
app.get("/", (req, res) => {
    fs_1.default.readFile(readmePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading README.md:", err);
            res.status(500).send("Error reading README.md");
            return;
        }
        // Convert Markdown to HTML
        const htmlContent = (0, marked_1.marked)(data);
        res.setHeader("Content-Type", "text/html");
        res.send(htmlContent);
    });
});
app.use("/api", index_1.default);
// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: "API endpoint not found" });
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
