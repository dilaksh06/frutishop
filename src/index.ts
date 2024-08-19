import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import fruitRoutes from './routes/FruitsRoutes'; // Adjust path if necessary
import UserRoutes from './routes/FruitsRoutes';
import OrderRoutes from './routes/OrderRoutes';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    next();
});

app.use(express.json()); // Add this line to parse JSON bodies


app.use(UserRoutes);
app.use(fruitRoutes);
app.use(OrderRoutes);


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
