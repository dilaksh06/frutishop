import { Router } from "express";
import { addFruit, deleteFruit, updateFruit, getFruitsBySellerId, getAllFruits, getFruitById } from "../controllers/FruitsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/', authMiddleware, getAllFruits);
router.get('/get/:id', getFruitById);
router.post('/addFruit', authMiddleware ,addFruit);
router.get('/:sellerId', getFruitsBySellerId);
router.put('/updateFruit/:ProductID', updateFruit);
router.delete('/deleteFruit/:ProductID', deleteFruit);

export default router;