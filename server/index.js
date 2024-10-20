import colors from "colors";

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
const corsOption = {
    origin: process.env.CLIENT_URL,
    methods : ["GET","POST","PUT","PATCH","DELETE"],
}
app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.send("This is in Testing!");
})

app.listen(process.env.PORT, () => {
    console.log(`Click to connect to the server: http://localhost:${process.env.PORT}`.bold.green.underline);
    console.log(`Server is running on port ${process.env.PORT}`.bold.red.underline);
})

// import bodyParser from "body-parser";
// app.use(bodyParser.json());

// what is the use of body-parser
// body-parser is a middleware in Node.js that is used to handle incoming request bodies in various formats, 
// particularly in web applications built with Express.js or other similar frameworks. 
// It parses the incoming request body and makes it accessible under the req.body property.