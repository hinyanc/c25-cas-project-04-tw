// import { Knex } from "knex";
// import { comparePassword } from "../utils/hash";
// import { LoginUserType, User } from "../utils/model";
// import jwt from "jwt-simple";
// import jwtConfig from "../utils/jwt";
// import { HttpError } from "../http-error";

// export class UserService {
//   constructor(private knex: Knex) {}

//   table() {
//     return this.knex("users");
//   }

//   async loginWithPassword(user: LoginUserType) {
//     console.log("entered service",user)
//     let row = await this.table()
//       .select("id", "password", "username")
//       .where({ email: user.email });

//     if (!row[0]) {
//       throw new HttpError("Cannot find user", 401);
//     }

//     let isMatch = await comparePassword(user.password, row[0].password);

//     if (!isMatch) {
//       throw new HttpError("Wrong email or password", 402);
//     }

//     let token: string = this.createToken({
//       id: row[0].id,
//       username: row[0].username,
//     });

//     return token;
//   }

//   createToken(user: User) {
//     let payload: User = {
//       id: user.id,
//       username: user.username,
//     };

//     let token: string = jwt.encode(payload, jwtConfig.jwtSecret!);
//     return token;
//   }

//   decodeToken(token: string) {
//     let payload: User;

//     try {
//       payload = jwt.decode(token, jwtConfig.jwtSecret);
//     } catch (error) {
//       throw new HttpError("Invaild Token", 405);
//     }

//     return payload;
//   }
// }
import { Knex } from 'knex'

export class AuthService {
	constructor(private knex: Knex) {}
	async getUser(email:string) {
		const user = (await this.knex
			.select('*')
			.from('users')
            .where('email', email))[0]
		return user;
	}

}