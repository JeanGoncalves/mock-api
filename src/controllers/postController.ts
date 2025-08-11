import { Request, Response } from "express";
import { PostService } from "../services/postService";
import {
  GetPostByIdParamsSchema,
  UpdatePostParamsSchema,
  NewPostItemSchema,
} from "../schemas/postSchemas";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getPosts();
      res.json(posts);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetPostByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const post = await this.postService.getPostById(id);

      if (!post) {
        res.status(404).json({ message: "Post não encontrado" });
        return;
      }

      res.json(post);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = NewPostItemSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Dados inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const postData = validationResult.data;
      const newPost = await this.postService.createPost(postData);

      res.status(201).json(newPost);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = UpdatePostParamsSchema.safeParse(req.params);
      const bodyValidation = NewPostItemSchema.safeParse(req.body);
      
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
      const postData = bodyValidation.data;

      const updatedPost = await this.postService.updatePost(id, postData);

      if (!updatedPost) {
        res.status(404).json({ message: "Post não encontrado" });
        return;
      }

      res.json(updatedPost);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetPostByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const deleted = await this.postService.deletePost(id);

      if (!deleted) {
        res.status(404).json({ message: "Post não encontrado" });
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
