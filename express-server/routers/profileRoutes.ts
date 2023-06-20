import express from "express";
import { profileController } from "../server";
import { isLoggedIn } from "../guards";

export const profileRoutes = express.Router();

profileRoutes.get("/info", isLoggedIn, profileController.getInfo);
profileRoutes.put("/update", isLoggedIn, profileController.updateInfo);
