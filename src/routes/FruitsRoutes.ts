import { Router } from "express";
import { addFruit, deleteFruit, updateFruit } from "../controllers/FruitsController";
const router = Router();

router.post('/addFruit', addFruit);
router.put('/updateFruit/:ProductID', updateFruit); // Update fruit by ProductID
router.delete('/deleteFruit/:ProductID', deleteFruit);
// Test route to check parameter passing
router.get('/test/:ProductID', (req, res) => {
    console.log(req.params.ProductID);
    res.send('Check console for ProductID');
});

export default router;