import { Router } from "express";
import { addFruit, deleteFruit, updateFruit } from "../controllers/FruitsController";
const router = Router();

router.post('/addFruit', addFruit);
router.put('/updateFruit/:ProductID', updateFruit);
router.delete('/deleteFruit/:ProductID', deleteFruit);

export default router;