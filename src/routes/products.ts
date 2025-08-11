import { Router } from "express";
import { db, getNextId } from "../db";
import { NewProduct, Product } from "../types";

export const productsRouter = Router();

productsRouter.get("/", (_req, res) => {
  res.json(db.products);
});

productsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = db.products.find((p) => p.id === id);
  if (!item) return res.status(404).json({ message: "Product not found" });
  res.json(item);
});

productsRouter.post("/", (req, res) => {
  const payload = req.body as NewProduct;
  if (!payload?.name || typeof payload?.price !== "number") {
    return res.status(400).json({ message: "name and price are required" });
  }
  const created: Product = { id: getNextId(db.products), ...payload };
  db.products.push(created);
  res.status(201).json(created);
});

productsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const payload = req.body as NewProduct;
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  const updated: Product = { id, ...payload };
  db.products[index] = updated;
  res.json(updated);
});

productsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  db.products.splice(index, 1);
  res.status(204).send();
});


