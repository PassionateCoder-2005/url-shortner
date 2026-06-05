import dotenv from "dotenv"
dotenv.config()
export const CONFIG={
    PORTS: process.env.PORTS,
    MONGODB_URI:process.env.MONGODB_URI
}
if(!process.env.PORTS){
    throw new Error("PORT is not defined in .env file")
}
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in .env file")
}
