import express from "express";
import { discoverController } from "../server";
// import  {isLoggedIn} from '../guards'

export const discoverRoutes = express.Router();

discoverRoutes.get("/get-user-info", discoverController.getUserInfo);
discoverRoutes.get("/get-all-profile", discoverController.getAllProfile);
discoverRoutes.get("/get-all-users", discoverController.getAllUsers);
discoverRoutes.get("/get-all-pt", discoverController.getAllPT);
discoverRoutes.put("/like-users", discoverController.updateLikeUser);
discoverRoutes.put("/dislike-users", discoverController.updateDislikeUser);