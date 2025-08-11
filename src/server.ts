import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users";
import { productsRouter } from "./routes/products";
import { postsRouter } from "./routes/posts";
import { professionalsRouter } from "./routes/professionals";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "mock-api", language: "typescript" });
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/posts", postsRouter);
app.use("/professionals", professionalsRouter);


