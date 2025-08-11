import { Router } from "express";
import { ProductController } from "../controllers/productController";

export const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.list);
productsRouter.get("/:id", productController.getById);
productsRouter.post("/", productController.create);
productsRouter.put("/:id", productController.update);
productsRouter.delete("/:id", productController.delete);
