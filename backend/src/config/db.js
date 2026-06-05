import mongoose  from "mongoose";
import { CONFIG } from "./config.js";
let db=async () => {
    try {
        let res=await mongoose.connect(CONFIG.MONGODB_URI)
        if(res){
            console.log('mongodb connected');
            
        }
    } catch (error) {
        console.log('error in connection with mongodb',error.message);
        
    }
}
export default db;