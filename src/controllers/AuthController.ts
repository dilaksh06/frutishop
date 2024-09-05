import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { Types } from 'mongoose';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authController = async (req: AuthRequest, res: Response) => {
  console.log('Auth Middleware');
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: Types.ObjectId };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        return res.status(401).json({ authenticated: false });
    }
    return res.status(200).json({ authenticated: true });


  } catch (err) {
    return res.status(401).json({ authenticated: false });
}
};
