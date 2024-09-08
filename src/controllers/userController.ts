// src/controllers/userController.ts
import { Request, Response } from "express";
import userService from "../services/userService";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res
      .status(200)
      .json({ success: true, message: "Users Found successfully", users });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { createUser, getAllUsers };
