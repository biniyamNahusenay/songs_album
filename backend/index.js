// Packages
import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import connectDB from "./db/db.js";
import songRoute from "./routes/songRoute.js"

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/song",songRoute)

app.get("/", (req, res) => {
    res.status(201).json({ message: "Server is  up and running" });
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));