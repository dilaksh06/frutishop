import { Router } from "express";
import { authController } from "../controllers/AuthController";

const router = Router();

router.get('/check', authController);

export default router;