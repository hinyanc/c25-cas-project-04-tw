import { messageController } from "../server";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.post("/", messageController.sendController);