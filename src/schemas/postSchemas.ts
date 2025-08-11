import { z } from "zod";

const PostItemSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1, "Título é obrigatório").max(200, "Título deve ter no máximo 200 caracteres"),
  body: z.string().min(1, "Conteúdo é obrigatório").max(5000, "Conteúdo deve ter no máximo 5000 caracteres"),
});

const NewPostItemSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(200, "Título deve ter no máximo 200 caracteres"),
  body: z.string().min(1, "Conteúdo é obrigatório").max(5000, "Conteúdo deve ter no máximo 5000 caracteres"),
});

const GetPostByIdParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const UpdatePostParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

export {
  PostItemSchema,
  NewPostItemSchema,
  GetPostByIdParamsSchema,
  UpdatePostParamsSchema,
};

export type PostItem = z.infer<typeof PostItemSchema>;
export type NewPostItem = z.infer<typeof NewPostItemSchema>;
export type GetPostByIdParams = z.infer<typeof GetPostByIdParamsSchema>;
export type UpdatePostParams = z.infer<typeof UpdatePostParamsSchema>;
