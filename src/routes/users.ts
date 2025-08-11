import { Router } from "express";
import { db, getNextId } from "../db";
import { NewUser, User } from "../types";

export const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
  res.json(db.users);
});

usersRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = db.users.find((u) => u.id === id);
  if (!item) return res.status(404).json({ message: "User not found" });
  res.json(item);
});

usersRouter.post("/", (req, res) => {
  const payload = req.body as NewUser;
  if (!payload?.name || !payload?.email) {
    return res.status(400).json({ message: "name and email are required" });
  }
  const created: User = { id: getNextId(db.users), ...payload };
  db.users.push(created);
  res.status(201).json(created);
});

usersRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const payload = req.body as NewUser;
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  const updated: User = { id, ...payload };
  db.users[index] = updated;
  res.json(updated);
});

usersRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  db.users.splice(index, 1);
  res.status(204).send();
});


