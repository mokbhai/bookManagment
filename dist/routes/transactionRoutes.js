"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/transactionRoutes.ts
const express_1 = __importDefault(require("express"));
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const router = express_1.default.Router();
router.post("/issue", transactionController_1.default.issueBook);
router.post("/return", transactionController_1.default.returnBook);
router.get("/bookStatus", transactionController_1.default.bookStatus);
router.get("/bookRevenue", transactionController_1.default.bookRevenue);
router.get("/booksByUser", transactionController_1.default.getBooksByUser);
router.get("/booksByDateRange", transactionController_1.default.getBooksByDateRange);
router.post("/dummy", transactionController_1.default.createDummyTransations);
exports.default = router;
