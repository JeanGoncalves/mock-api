import { z } from "zod";

const ProductSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  price: z.number().positive("Preço deve ser positivo").max(999999.99, "Preço deve ser menor que 1.000.000"),
});

const NewProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  price: z.number().positive("Preço deve ser positivo").max(999999.99, "Preço deve ser menor que 1.000.000"),
});

const GetProductByIdParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const UpdateProductParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

export {
  ProductSchema,
  NewProductSchema,
  GetProductByIdParamsSchema,
  UpdateProductParamsSchema,
};

export type Product = z.infer<typeof ProductSchema>;
export type NewProduct = z.infer<typeof NewProductSchema>;
export type GetProductByIdParams = z.infer<typeof GetProductByIdParamsSchema>;
export type UpdateProductParams = z.infer<typeof UpdateProductParamsSchema>;
