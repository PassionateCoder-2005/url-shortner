import {body,validationResult} from 'express-validator';
let validateUrl=(req, res, next)=>{
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}
export let createUrlValidator=[
    body("originalUrl").notEmpty().withMessage("longUrl is required").isURL().withMessage("longUrl must be a valid url"),
    validateUrl
]