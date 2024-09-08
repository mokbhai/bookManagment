// src/routes/userRoutes.ts
import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/list", userController.getAllUsers);

export default router;
