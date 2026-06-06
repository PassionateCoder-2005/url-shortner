import jwt from "jsonwebtoken"
import { CONFIG } from "../config/config.js"
export let accessTokenGenrator=(user) => {
    return jwt.sign({
        id:user._id
    },CONFIG.JWT_SECRET,{
        expiresIn:"15m"
    })
}
export let refreshTokenGenrator=(user) => {
    return jwt.sign({
        id:user._id
    },CONFIG.JWT_SECRET,{
        expiresIn:"1d"
    })
}
