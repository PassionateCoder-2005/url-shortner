import { Router } from "express";
import { createShortUrl, deleteUrl, getAll, getShortUrl } from "../controllers/url.contoller.js";
import { checkLogged } from "../middleware/auth.middlware.js";
import { createUrlValidator } from "../validation/url.validation.js";
let urlRouter=Router()
urlRouter.post("/create-short",checkLogged,createUrlValidator,createShortUrl)
urlRouter.get("/all-url",checkLogged,getAll)
urlRouter.delete("/delete/:shortCode",checkLogged,deleteUrl)
urlRouter.get("/:shortCode",getShortUrl)
export default urlRouter