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
goalRoutes.get("/get-goals", isLoggedIn, goalController.getGoals);
goalRoutes.post("/add-goals", isLoggedIn, goalController.addGoals);
goalRoutes.put("/update-goals", isLoggedIn, goalController.updateCompletedGoals);
