import { Router } from "express";
import { db, getNextId } from "../db";
import { NewPostItem, PostItem } from "../types";

export const postsRouter = Router();

postsRouter.get("/", (_req, res) => {
  res.json(db.posts);
});

postsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = db.posts.find((p) => p.id === id);
  if (!item) return res.status(404).json({ message: "Post not found" });
  res.json(item);
});

postsRouter.post("/", (req, res) => {
  const payload = req.body as NewPostItem;
  if (!payload?.title || !payload?.body) {
    return res.status(400).json({ message: "title and body are required" });
  }
  const created: PostItem = { id: getNextId(db.posts), ...payload };
  db.posts.push(created);
  res.status(201).json(created);
});

postsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const payload = req.body as NewPostItem;
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  const updated: PostItem = { id, ...payload };
  db.posts[index] = updated;
  res.json(updated);
});

postsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  db.posts.splice(index, 1);
  res.status(204).send();
});


