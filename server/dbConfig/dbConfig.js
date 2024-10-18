import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();
const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB".cyan.bold.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
};