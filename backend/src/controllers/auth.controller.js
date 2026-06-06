import userModel from "../models/user.models.js";
import { accessTokenGenrator, refreshTokenGenrator} from "../service/token.genrator.js";

export const register=async (req,res) => {
    try {
        let {username,email,password}=req.body;
       let isUser=await userModel.findOne({
        email
       })
       if(isUser){
        return res.status(409).json({
             messsage:'User already exists'
        })
       }
      let user=await userModel.create({
        username,
        email,
        password
      }) 
      let accessToken=accessTokenGenrator(user)
      let refreshToken=refreshTokenGenrator(user)

       res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:24*60*60*1000
       })
       res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:15*60*1000
       })
       user.refreshToken=refreshToken;
       await user.save();
       return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
       })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const login=async (req,res) => {
    try {
        let {email,password}=req.body;
       let user=await userModel.findOne({
        email
       })
       if(!user){
        return res.status(401).json({
             messsage:'Invalid credentials'
        })
       }
       let com=user.comparePassword(password)
       if(!com){
        return res.status(401).json({
            message:"Invalid credentials"
        })
       }
      let accessToken=accessTokenGenrator(user)
      let refreshToken=refreshTokenGenrator(user)

       res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:24*60*60*1000
       })
       res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:15*60*1000
       })
       user.refreshToken=refreshToken;
       await user.save();
       return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
       })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const getMe=async (req,res) => {
    try {
        let user=req.user
        return res.status(200).json({
            message:"Your data",
            user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}