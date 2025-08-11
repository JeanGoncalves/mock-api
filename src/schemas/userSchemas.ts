import { z } from "zod";

const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("Email deve ser válido").max(255, "Email deve ter no máximo 255 caracteres"),
});

const NewUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("Email deve ser válido").max(255, "Email deve ter no máximo 255 caracteres"),
});

const GetUserByIdParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const UpdateUserParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

export {
  UserSchema,
  NewUserSchema,
  GetUserByIdParamsSchema,
  UpdateUserParamsSchema,
};

export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type GetUserByIdParams = z.infer<typeof GetUserByIdParamsSchema>;
export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>;
