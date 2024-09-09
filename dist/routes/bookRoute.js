"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/bookRoutes.ts
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const router = express_1.default.Router();
router.post("/create", bookController_1.default.createBook);
router.get("/list", bookController_1.default.getBooks);
exports.default = router;
