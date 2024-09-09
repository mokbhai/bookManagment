// src/routes/index.ts
import express from "express";
import userRoute from "./userRoute";
import bookRoute from "./bookRoute";
import transactionRoutes from "./transactionRoutes";
const router = express.Router();
router.use("/user", userRoute);
router.use("/book", bookRoute);
router.use("/transaction", transactionRoutes);
export default router;
