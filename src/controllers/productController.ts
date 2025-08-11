import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import {
  GetProductByIdParamsSchema,
  UpdateProductParamsSchema,
  NewProductSchema,
} from "../schemas/productSchemas";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetProductByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const product = await this.productService.getProductById(id);

      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res.json(product);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = NewProductSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Dados inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const productData = validationResult.data;
      const newProduct = await this.productService.createProduct(productData);

      res.status(201).json(newProduct);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = UpdateProductParamsSchema.safeParse(req.params);
      const bodyValidation = NewProductSchema.safeParse(req.body);
      
      if (!paramsValidation.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: paramsValidation.error.issues
        });
        return;
      }

      if (!bodyValidation.success) {
        res.status(400).json({ 
          message: "Dados inválidos",
          errors: bodyValidation.error.issues
        });
        return;
      }

      const { id } = paramsValidation.data;
      const productData = bodyValidation.data;

      const updatedProduct = await this.productService.updateProduct(id, productData);

      if (!updatedProduct) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res.json(updatedProduct);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetProductByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const deleted = await this.productService.deleteProduct(id);

      if (!deleted) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    res.status(500).json({ 
      message: "Erro interno do servidor",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
