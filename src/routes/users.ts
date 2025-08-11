import { Router } from "express";
import { UserController } from "../controllers/userController";

export const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", userController.list);
usersRouter.get("/:id", userController.getById);
usersRouter.post("/", userController.create);
usersRouter.put("/:id", userController.update);
usersRouter.delete("/:id", userController.delete);
