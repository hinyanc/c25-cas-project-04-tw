import {Request, Response} from "express";
import {logger} from "../utils/logger"
import {AuthService} from "../services/authService";
import {comparePassword} from "../utils/hash"
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt"

export class AuthController{
    constructor(private authService:AuthService){}

    login = async (req:Request,res:Response)=>{
        try{
            const {email,password}= req.body
            if(!email||!password){
                throw new Error("Missing email or password")
            }
            const user = await this.authService.getUser(email);

            if(!user){
                throw new Error("No user found")
            }
            let result = await comparePassword(password,user.password)
            if(!result){
                throw new Error ("Password mismatch")
            }
            const payload ={
                id:user.id,
                username:user.username
            }
            const token = jwtSimple.encode(payload, jwt.jwtSecret)
            res.json({
                token:token,
                user:user.id
            })
            
        }catch(error:any){
            logger.error(error.message)
            res.status(400).json({message:"Failed to login"})
        }

    }
}
