import { z } from "zod";

const GeoLocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

const WorkingHoursSchema = z.object({
  day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
  hours: z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Formato deve ser HH:MM-HH:MM"),
});

const DiaryEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato deve ser YYYY-MM-DD"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Formato deve ser HH:MM"),
  status: z.enum(["available", "not-available", "booked"]),
});

const ProfessionalSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, "Nome é obrigatório"),
  services: z.array(z.enum(["beleza", "mecânico", "construção", "limpeza", "outro"])).min(1, "Pelo menos um serviço é obrigatório"),
  basePrice: z.number().positive("Preço deve ser positivo"),
  rating: z.number().min(0).max(5, "Avaliação deve estar entre 0 e 5"),
  reviewCount: z.number().min(0),
  location: GeoLocationSchema,
  city: z.string().min(1, "Cidade é obrigatória"),
  workingHours: z.array(WorkingHoursSchema).min(1, "Pelo menos um horário de trabalho é obrigatório"),
  diary: z.array(DiaryEntrySchema),
});

const CreateProfessionalBodySchema = ProfessionalSchema.omit({ id: true }).partial({
  rating: true,
  reviewCount: true,
  diary: true,
});

const UpdateProfessionalBodySchema = CreateProfessionalBodySchema.partial();

const GetProfessionalsQuerySchema = z.object({
  service: z.enum(["beleza", "mecânico", "construção", "limpeza", "outro"]).optional(),
  city: z.string().min(1).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sort: z.enum(["relevance", "price", "rating"]).optional(),
});

const GetProfessionalByIdParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const GetWorkingHoursParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const GetDiaryParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const GetDiaryQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato deve ser YYYY-MM-DD").optional(),
});

const GetAvailabilityParamsSchema = z.object({
  id: z.coerce.number().positive("ID deve ser um número positivo"),
});

const GetAvailabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato deve ser YYYY-MM-DD"),
});

const SearchNearbyQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().min(0.1).max(1000).default(10),
  service: z.enum(["beleza", "mecânico", "construção", "limpeza", "outro"]).optional(),
});

const GetByServiceCategoryParamsSchema = z.object({
  category: z.enum(["beleza", "mecânico", "construção", "limpeza", "outro"]),
});

const GetByServiceCategoryQuerySchema = z.object({
  city: z.string().min(1).optional(),
});

export {
  ProfessionalSchema,
  GetProfessionalsQuerySchema,
  GetProfessionalByIdParamsSchema,
  GetWorkingHoursParamsSchema,
  GetDiaryParamsSchema,
  GetDiaryQuerySchema,
  GetAvailabilityParamsSchema,
  GetAvailabilityQuerySchema,
  SearchNearbyQuerySchema,
  GetByServiceCategoryParamsSchema,
  GetByServiceCategoryQuerySchema,
  CreateProfessionalBodySchema,
  UpdateProfessionalBodySchema,
};

export type GetProfessionalsQuery = z.infer<typeof GetProfessionalsQuerySchema>;
export type GetProfessionalByIdParams = z.infer<typeof GetProfessionalByIdParamsSchema>;
export type GetWorkingHoursParams = z.infer<typeof GetWorkingHoursParamsSchema>;
export type GetDiaryParams = z.infer<typeof GetDiaryParamsSchema>;
export type GetDiaryQuery = z.infer<typeof GetDiaryQuerySchema>;
export type GetAvailabilityParams = z.infer<typeof GetAvailabilityParamsSchema>;
export type GetAvailabilityQuery = z.infer<typeof GetAvailabilityQuerySchema>;
export type SearchNearbyQuery = z.infer<typeof SearchNearbyQuerySchema>;
export type GetByServiceCategoryParams = z.infer<typeof GetByServiceCategoryParamsSchema>;
export type GetByServiceCategoryQuery = z.infer<typeof GetByServiceCategoryQuerySchema>;
export type CreateProfessionalBody = z.infer<typeof CreateProfessionalBodySchema>;
export type UpdateProfessionalBody = z.infer<typeof UpdateProfessionalBodySchema>;
