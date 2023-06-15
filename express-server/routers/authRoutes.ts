import express from "express";
import { authController } from "../server"

export const authRoutes = express.Router()
authRoutes.post("/login",authController.login)