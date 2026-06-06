import {Router} from "express"
import { getMe, login, register } from "../controllers/auth.controller.js"
import { loginValidator, registerValidator } from "../validation/auth.validator.js"
import { checkLogged } from "../middleware/auth.middlware.js"
let authRouter=Router()
authRouter.post("/register",registerValidator,register)
authRouter.post("/login",loginValidator,login)
authRouter.get("/getme",checkLogged,getMe)
export default authRouter