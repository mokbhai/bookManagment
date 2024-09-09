// src/routes/bookRoutes.ts
import express from "express";
import bookController from "../controllers/bookController";
const router = express.Router();
router.post("/create", bookController.createBook);
router.get("/list", bookController.getBooks);
export default router;
