import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/register").post(loginUser)

export default userRouter;
