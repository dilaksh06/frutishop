import express from "express";
import userRoutes from './routes/UserRoutes';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { deleteUser, login, logout, register } from "./controllers/UserController";
import { addFruit, deleteFruit, updateFruit } from "./controllers/FruitsController";
import fruitRoutes from './routes/FruitsRoutes'; // Adjust path if necessary
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    next();
});

app.use(express.json()); // Add this line to parse JSON bodies

app.use('/registration', register);
app.use('/login', login)
app.use('/delete', deleteUser);  // Add route for account deletion
app.use('/logout', logout);  // Add route for logout

// app.use('/addFruit', addFruit);
// app.use('/updateFruit/:ProductID', updateFruit); // Update fruit by ProductID
// app.use(deleteFruit);
// app.use('/test/:ProductID');
app.use(fruitRoutes);

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
