import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from 'mongoose';
import { User, IUser } from "../models/User";

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const register = async (req: Request, res: Response) => {
    console.log('Inside register function');
    console.log('Request body:', req.body);

    const { username, email, password, address, phone, userType, storeId } = req.body;

    if (!username || !email || !password || !address || !phone || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create new user
        const user: IUser = new User({
            username,
            email,
            password,
            address,
            phone,
            userType,
            storeId: storeId || null
        });
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        // Send response
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({ message: 'An error occurred during registration' });
    }
};
