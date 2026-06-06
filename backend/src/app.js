import express from "express"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import urlRouter from "./routes/url.routes.js";
let server=express();
server.use(express.json())
server.use(morgan("dev"))
server.use(cookieParser())
server.use("/api/auth",authRouter)
server.use("/api/url",urlRouter)
export default server;