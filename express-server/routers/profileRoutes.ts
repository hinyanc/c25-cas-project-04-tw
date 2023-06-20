import express from "express";
import { profileController } from "../server";

export const profileRoutes = express.Router();

profileRoutes.put("/", profileController.updateInfo);