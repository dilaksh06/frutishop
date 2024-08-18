import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("hello");
})

mongoose.connect("mongodb://localhost:27017").then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })
}).catch((e) => {
    console.error(e);
})


