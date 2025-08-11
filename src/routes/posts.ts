import { Router } from "express";
import { PostController } from "../controllers/postController";

export const postsRouter = Router();
const postController = new PostController();

postsRouter.get("/", postController.list);
postsRouter.get("/:id", postController.getById);
postsRouter.post("/", postController.create);
postsRouter.put("/:id", postController.update);
postsRouter.delete("/:id", postController.delete);
