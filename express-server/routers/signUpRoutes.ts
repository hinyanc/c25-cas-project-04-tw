import express from "express";
import { signUpController } from "../server";
import { upload } from "../utils/multer";

export const signUpRoutes = express.Router();

signUpRoutes.post(
  "/",
  upload.single("profile_pic"),
  signUpController.createUser
);
