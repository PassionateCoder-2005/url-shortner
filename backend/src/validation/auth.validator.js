import {body, validationResult} from "express-validator";
let valid=(req,res,next)=>{
   let errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   next();
}
export let registerValidator=[
    body("username").notEmpty().withMessage("username is required"),
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("email must be valid"),
    body("password").notEmpty().withMessage("password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    valid
]
export let loginValidator=[
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("email must be valid"),
    body("password").notEmpty().withMessage("password is required"),
    valid
]