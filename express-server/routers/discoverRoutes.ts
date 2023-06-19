import express from "express";
import { discoverController } from "../server";
import  {isLoggedIn} from '../guards'

export const discoverRoutes = express.Router();

discoverRoutes.get("/get-user-info", isLoggedIn, discoverController.getUserInfo);
discoverRoutes.get("/get-all-profile",isLoggedIn, discoverController.getAllProfile);
discoverRoutes.get("/get-all-users",isLoggedIn, discoverController.getAllUsers);
discoverRoutes.get("/get-all-pt", isLoggedIn,discoverController.getAllPT);
discoverRoutes.put("/like-users/:uid",isLoggedIn, discoverController.updateLikeUser);