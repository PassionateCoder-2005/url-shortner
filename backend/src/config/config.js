import dotenv from "dotenv"
dotenv.config()
export const CONFIG={
    PORTS: process.env.PORTS,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET
}
if(!process.env.PORTS){
    throw new Error("PORT is not defined in .env file")
}
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in .env file")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in .env file")
}