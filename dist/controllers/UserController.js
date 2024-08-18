"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, address, phone, userType, storeId } = req.body;
    try {
        // Check if userType is valid
        if (!['Seller', 'Buyer', 'Admin'].includes(userType)) {
            return res.status(400).json({ message: 'Invalid user type' });
        }
        // Create and save the new user
        const user = new User_1.User({ username, email, password, address, phone, userType, storeId });
        yield user.save();
        // Generate and send token
        const token = generateToken(user._id); // Explicitly cast to Types.ObjectId
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.register = register;
