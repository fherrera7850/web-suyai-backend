import { Router } from "express";
import { verifyToken } from "../libs/verifyToken";
import { getProductsController } from "../controllers/productController";

const router = Router();

router.get("/products", verifyToken, getProductsController);

export default router;