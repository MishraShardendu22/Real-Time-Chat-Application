import { connectDB } from './dbConfig/dbConfig.js';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/",(req,res) => {
//   res.send("API is running...");
// })

app.use("/api/auth",AuthRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log(`Click to connect: http://localhost:${PORT}`.yellow.bold.underline);
  console.log(`Server is running on port ${PORT}`.yellow.bold.underline);
});
