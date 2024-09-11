// Packages
import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import path from 'path'

import connectDB from "./db/db.js";
import songRoute from "./routes/songRoute.js"

dotenv.config();
connectDB();

const __dirname = path.resolve()

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

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));