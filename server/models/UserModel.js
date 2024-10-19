import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email :{
            type: String,
            required: [true,'Email is required'],
            unique: true
        },
        password : {
            type: String,
            required: [true,'Password is required']
        },
        firstName : {
            type: String,
            required : false,
        },
        lastName : {
            type: String,
            required : false,
        },
        images : {
            type: String,
            required : false
        },
        color : {
            type : Number,
            default : false
        },
        profileSetup : {
            type : Boolean,
            default : false
        }
    },{ timestamps : true }
)

// The isModified method comes from Mongoose, the library you're likely using to define your user schema. 
// Mongoose provides this method to check if a specific field in a document has been modified before saving it. 
// In this case, it's being used to check if the password field has been changed (for example, during user registration or password update) before rehashing it.

userSchema.pre("save",async function (next){
    
    // Only hash if the password is modified
    if (!this.isModified("password")) return next();


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model("User",userSchema);
export default User;