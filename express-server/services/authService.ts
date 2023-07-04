import { Knex } from "knex";
import jwt from "../utils/jwt";
import jwtSimple from "jwt-simple";

export class AuthService {
  async decodeToken(token: any) {
    try {
      return await jwtSimple.decode(token, jwt.jwtSecret);
    } catch (e) {
      console.log("token decode error");
    }
  }
  constructor(private knex: Knex) {}
  async getUser(email: string) {
    const user = (
      await this.knex.select("*").from("users").where("email", email)
    )[0];
    return user;
  }
}
