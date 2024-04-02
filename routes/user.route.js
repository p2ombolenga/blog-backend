import express from "express";
import { getAllUsers, createUser, loginUser } from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);

export default userRouter;