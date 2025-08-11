import { Request, Response } from "express";
import { ProfessionalService } from "../services/professionalService";
import {
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
} from "../schemas/professionalSchemas";

export class ProfessionalController {
  private professionalService: ProfessionalService;

  constructor() {
    this.professionalService = new ProfessionalService();
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetProfessionalsQuerySchema.safeParse(req.query);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { service, city, minRating, maxPrice, sort } = validationResult.data;
      const professionals = await this.professionalService.getProfessionals({
        service,
        city,
        minRating,
        maxPrice,
        sort: sort || "relevance"
      });

      res.json(professionals);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetProfessionalByIdParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const professional = await this.professionalService.getProfessionalById(id);

      if (!professional) {
        res.status(404).json({ message: "Profissional não encontrado" });
        return;
      }

      res.json(professional);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getWorkingHours(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetWorkingHoursParamsSchema.safeParse(req.params);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { id } = validationResult.data;
      const workingHours = await this.professionalService.getWorkingHours(id);

      if (!workingHours) {
        res.status(404).json({ message: "Profissional não encontrado" });
        return;
      }

      res.json(workingHours);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getDiary(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = GetDiaryParamsSchema.safeParse(req.params);
      const queryValidation = GetDiaryQuerySchema.safeParse(req.query);
      
      if (!paramsValidation.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: paramsValidation.error.issues
        });
        return;
      }

      if (!queryValidation.success) {
        res.status(400).json({ 
          message: "Query inválida",
          errors: queryValidation.error.issues
        });
        return;
      }

      const { id } = paramsValidation.data;
      const { date } = queryValidation.data;

      const diary = await this.professionalService.getDiary(id, date);

      if (!diary) {
        res.status(404).json({ message: "Profissional não encontrado" });
        return;
      }

      res.json(diary);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = GetAvailabilityParamsSchema.safeParse(req.params);
      const queryValidation = GetAvailabilityQuerySchema.safeParse(req.query);
      
      if (!paramsValidation.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: paramsValidation.error.issues
        });
        return;
      }

      if (!queryValidation.success) {
        res.status(400).json({ 
          message: "Query inválida",
          errors: queryValidation.error.issues
        });
        return;
      }

      const { id } = paramsValidation.data;
      const { date } = queryValidation.data;

      const availability = await this.professionalService.getAvailability(id, date);

      if (!availability) {
        res.status(404).json({ message: "Profissional não encontrado" });
        return;
      }

      res.json(availability);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async searchNearby(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = SearchNearbyQuerySchema.safeParse(req.query);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: validationResult.error.issues
        });
        return;
      }

      const { lat, lng, radius, service } = validationResult.data;
      const professionals = await this.professionalService.searchNearby({
        lat,
        lng,
        radius,
        service
      });

      res.json(professionals);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByServiceCategory(req: Request, res: Response): Promise<void> {
    try {
      const paramsValidation = GetByServiceCategoryParamsSchema.safeParse(req.params);
      const queryValidation = GetByServiceCategoryQuerySchema.safeParse(req.query);
      
      if (!paramsValidation.success) {
        res.status(400).json({ 
          message: "Parâmetros inválidos",
          errors: paramsValidation.error.issues
        });
        return;
      }

      if (!queryValidation.success) {
        res.status(400).json({ 
          message: "Query inválida",
          errors: queryValidation.error.issues
        });
        return;
      }

      const { category } = paramsValidation.data;
      const { city } = queryValidation.data;

      const professionals = await this.professionalService.getByServiceCategory(category, city);

      res.json(professionals);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    res.status(500).json({ 
      message: "Erro interno do servidor",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
