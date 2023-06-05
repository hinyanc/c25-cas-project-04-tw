import { compare, hash } from "bcryptjs";

let ROUND = 15;
export async function hashPasword(password: string) {
  let result: string = await hash(password, ROUND);
  return result;
}

export async function comparePassword(password: string, password_hash: string) {
  let isMatch: boolean = await compare(password, password_hash);
  return isMatch;
}
