import mongoose from "mongoose";
import bcrypt from "bcryptjs"
let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique" ]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
},{ timestamps:true });
userSchema.pre("save",async function(){
    if(this.isModified("password")){
        let salt=await bcrypt.genSalt(10);
        let hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
    }
});
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
let userModel=mongoose.model("users",userSchema);
export default userModel;