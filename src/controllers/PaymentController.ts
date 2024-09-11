import { Request, Response } from 'express';
import Payment from '../models/Payment';
import { Order } from '../models/Order';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PrHd9Rxa5Loq6IRHlY17Wt8b5HUfssOiRWU2w79eGHFx6I7iiu5HvPqNYnna6cawXiwQGWQLZ3ZhI7F4mE9Rb5z00LWY9Ikco');

export const createPayment = async (req: Request, res: Response) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
      });
  
      res.json({
        clientSecret: paymentIntent.client_secret, // Send this to the frontend
      });
    } catch (error) {
      res.status(500).json({ message: "Payment failed" });
    }
};
