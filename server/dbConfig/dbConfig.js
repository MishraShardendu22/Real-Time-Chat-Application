import mongoose from "mongoose";
const MONGO_URI=process.env.MONGO_URI;

export const dbConfig = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log(connect) // testing ignore
    } catch (err) {
        console.log("There was an error connecting to the database");
        console.log(err);
    }
}