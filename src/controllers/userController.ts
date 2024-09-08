import { Request, Response } from "express";
import userService from "../services/userService";

/**
 * Controller function to create a new user.
 *
 * @param req - Express request object containing user data in the body
 * @param res - Express response object used to send back the HTTP response
 */
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

/**
 * Controller function to retrieve all users.
 *
 * @param req - Express request object
 * @param res - Express response object used to send back the HTTP response
 */
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res
      .status(200)
      .json({ success: true, message: "Users found successfully", users });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { createUser, getAllUsers };
