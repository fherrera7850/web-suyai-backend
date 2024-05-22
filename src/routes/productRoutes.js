import { Router } from "express";
import { verifyToken } from "../libs/verifyToken";
import { getProductsController, createProductController } from "../controllers/productController";

const router = Router();

router.get("/products", getProductsController);
router.post("/products/create", verifyToken, createProductController);

export default router;