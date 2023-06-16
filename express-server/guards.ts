import { Request, Response, NextFunction } from "express";
// import { userService } from "./server";
import { Bearer } from "permit";
import { User } from "./utils/model";
import jwt from "./utils/jwt";
import jwtSimple from "jwt-simple";

const permit = new Bearer({
  query: "access_token",
});

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = permit.check(req);
    console.log("check guard token",token)
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }



    const decoded: Omit<User, "password"> = jwtSimple.decode(
      token,
      jwt.jwtSecret
    );
    req.user = decoded;

    console.log("guard check", req.user);

    return next();
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Unauthorized! JWT Error!!!" });
  }
}
