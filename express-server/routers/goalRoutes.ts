import express from "express";
import { goalController } from "../server";

export const goalRoutes = express.Router();

goalRoutes.get("/get-bmi", goalController.getBMI);
goalRoutes.post("/set-target-weight", goalController.setTargetWeight);