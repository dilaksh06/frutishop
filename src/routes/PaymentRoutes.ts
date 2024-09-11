import { Router } from 'express';
import { createPayment } from '../controllers/PaymentController'; // Adjust the import path as necessary

const router = Router();

router.post('/create-payment-intent', createPayment);

export default router;
