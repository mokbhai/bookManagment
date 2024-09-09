// src/routes/transactionRoutes.ts
import express from "express";
import transactionController from "../controllers/transactionController";
const router = express.Router();
router.post("/issue", transactionController.issueBook);
router.post("/return", transactionController.returnBook);
router.get("/bookStatus", transactionController.bookStatus);
router.get("/bookRevenue", transactionController.bookRevenue);
router.get("/booksByUser", transactionController.getBooksByUser);
router.get("/booksByDateRange", transactionController.getBooksByDateRange);
router.post("/dummy", transactionController.createDummyTransations);
export default router;
