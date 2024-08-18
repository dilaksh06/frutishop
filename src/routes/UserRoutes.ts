import { register } from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.post('/', register); // Ensure this route is correctly mapped to `register`

export default router;
