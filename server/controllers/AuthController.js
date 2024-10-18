import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60

const createToken = (email,userId) => {
    return jwt.sign(
        { email, userId }, process.env.JWT_KEY,{ expiresIn : maxAge }
    )
}

export const register = async (req,res,next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json(
                {
                    message : "Email and Password are required"
                }
            )
        }
        const user = await User.create({
            email,
            password   
        })
        
        res.cookie("jwt",createToken(email,user._id),{ 
            maxAge : maxAge,
            sameSite : "None", 
        })

        return res.status(201).json(
            {
                user : {
                    id : user._id,
                    email : user.email,
                    profileSetup : user.profileSetup
                }
            }
        )
    }catch(error){
        console.log(error);
        return res.status(400).json(
            {
                message : "An error occured while registering the user"

            }
        )
    }
}

export const login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json(
                {
                    message : "Email and Password are required"
                }
            )
        }

        const user = await User.findOne({ email})

        if(!user){
            return res.status(400).json(
                {
                    message : "User not found"
                }
            )
        }


        const auth = await compare(password,user.password)
        if(!auth){
            return res.status(400).json(
                {
                    message : "Invalid Password"
                }
            )
        }
        console.log("Loggedin succesfully")
        res.status(200).json({
            user : {
                id : user._id,
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                images : user.images,
                color : user.color,
                profileSetup : user.profileSetup
            }
        })
    }catch(error){
        console.log(error);
        return res.status(400).json(
            {
                message : "An error occured while logging in the user"
            }
        )
    }
}