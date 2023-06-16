import express from "express";
import { signUpController } from "../server";

export const signUpRoutes = express.Router();

signUpRoutes.post("/", signUpController.createUser);
