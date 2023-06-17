import express from "express";
import { goalController } from "../server";
import { isLoggedIn } from "../guards";

export const goalRoutes = express.Router();

goalRoutes.get("/get-bmi", isLoggedIn, goalController.getBMI);
goalRoutes.post(
  "/set-target-weight",
  isLoggedIn,
  goalController.setTargetWeight
);
