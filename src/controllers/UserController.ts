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



// Login user
export const login = async (req: Request, res: Response) => {
    console.log('Inside login function');
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        // Send response
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};


// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    console.log('Inside deleteUser function');
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Delete user
        await User.deleteOne({ email });

        // Send response
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error during user deletion:', error);
        res.status(500).json({ message: 'An error occurred during account deletion' });
    }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('jwt', { httpOnly: true });
    return res.status(200).json({ message: 'Successfully logged out' });
};