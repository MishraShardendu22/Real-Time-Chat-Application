import User from '../model/user.model.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isLogin = async (req,res,next) => {
    try{
        console.log("check-1")

        const token = req.cookie.jwt;
        console.log(token)
        
        if(!token){
            return res.status(401).send(
                {
                    success : false,
                    message : "Token not found"
                }
            )
        }

        const decodedInfo = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedInfo){
            res.status(401).send(
                {
                    success : false,
                    message : "User Authorized - Invalid Token"
                }
            )
        }

        const user = await User.findById(decodedInfo._id).select("-password");
        if(!user){
            res.status(401).send(
                {
                    success : false,
                    message : "User Not Found"
                }
            )
        }

        req.user = user;
        next();

    }catch(error){
        console.log("Error in verifying the token",error.mesage);
        res.status(500).send({
                success : false,
                message : "Error in verifying the token"
            })
    }
}