import express from "express";
import { productsController, categoriesController } from "../controllers/catalogController.js";

const router = express.Router();

router.get("/categories", categoriesController);
router.get("/products", productsController);

export default router;
