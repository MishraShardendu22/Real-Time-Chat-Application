import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const MONGO_URI=process.env.MONGO_URI;

export const dbConfig = async () => {
    try {
        // testing ignore
        // console.log("Connecting to the database:", MONGO_URI);
        
        const connect = await mongoose.connect(MONGO_URI)
        // console.log(connect) 
    } catch (err) {
        console.log("There was an error connecting to the database");
        console.log(err);
    }
}