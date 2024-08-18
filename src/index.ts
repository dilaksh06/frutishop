import express from "express";
import userRoutes from './routes/UserRoutes';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to parse JSON bodies

app.use('/registration', userRoutes);

app.get('/', (req, res) => {
    res.send("hello");
});

mongoose.connect("mongodb://localhost:27017/fruitsshop")

    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    })
    .catch((e) => {
        console.error(e);
    });
