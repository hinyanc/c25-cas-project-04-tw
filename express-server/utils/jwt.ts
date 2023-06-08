import dotenv from "dotenv"
dotenv.config()

if(!process.env.JWT_SECRET){
    throw Error(".env variable value is missing")
}
export default {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: {
        session: false,
    },
};