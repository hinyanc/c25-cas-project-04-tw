import { Request, Response, NextFunction } from "express";
// import { userService } from "./server";
import { Bearer } from "permit";
import { User } from "./model";

const permit = new Bearer({
  query: "access_token",
});

export function checkJWT(req: Request, res: Response, next: NextFunction) {
  let token: string;
  try {
    token = permit.check(req);

    let user: User = userService.decodeToken(token);

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized! JWT Error!!!" });
  }
}
