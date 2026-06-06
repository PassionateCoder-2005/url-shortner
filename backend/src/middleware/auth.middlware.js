import jwt from "jsonwebtoken"
import { CONFIG } from "../config/config.js"
import userModel from "../models/user.models.js"
export let checkLogged=async (req,res,next) => {
    try {

        let accessToken=req.cookies.accessToken
        let refreshToken=req.cookies.refreshToken        
        if(!refreshToken || !accessToken){
            return res.status(401).json({
                message:"Token not found"
            })
        }
        let refreshTokenVerify=jwt.verify(refreshToken,CONFIG.JWT_SECRET)
        let accessTokenVerify=jwt.verify(accessToken,CONFIG.JWT_SECRET)
        if(!refreshTokenVerify || !accessTokenVerify){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        let user=await userModel.findById(refreshTokenVerify.id)
        req.user=user
        next()
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}