import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Types } from 'mongoose';
import { User, IUser } from "../models/User";


const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};


export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user: IUser = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
};