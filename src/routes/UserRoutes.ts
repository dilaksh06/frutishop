import { deleteUser, login, logout, register } from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.post('/', register); // Ensure this route is correctly mapped to `register`
router.post('/login', login);
router.delete('/delete', deleteUser);  // Add route for account deletion
router.post('/logout', logout);  // Add route for logout
export default router;
