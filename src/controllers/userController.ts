import { Request, Response } from "express";
import { UserService } from "../services/userService";
import {
  GetUserByIdParamsSchema,
  UpdateUserParamsSchema,
  NewUserSchema,
} from "../schemas/userSchemas";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetUserByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = NewUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Dados inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const userData = validationResult.data;
      const newUser = await this.userService.createUser(userData);

      res.status(201).json(newUser);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = UpdateUserParamsSchema.safeParse(req.params);
      const bodyValidation = NewUserSchema.safeParse(req.body);
      
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
      const userData = bodyValidation.data;

      const updatedUser = await this.userService.updateUser(id, userData);

      if (!updatedUser) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.json(updatedUser);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetUserByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ message: "Usuário não encontrado" });
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
