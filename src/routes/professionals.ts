import { Router } from "express";
import { ProfessionalController } from "../controllers/professionalController";

export const professionalsRouter = Router();
const professionalController = new ProfessionalController();

professionalsRouter.get("/", professionalController.list);
professionalsRouter.get("/:id", professionalController.getById);
professionalsRouter.get("/:id/working-hours", professionalController.getWorkingHours);
professionalsRouter.get("/:id/diary", professionalController.getDiary);
professionalsRouter.get("/:id/availability", professionalController.getAvailability);
professionalsRouter.get("/search/nearby", professionalController.searchNearby);
professionalsRouter.get("/service/:category", professionalController.getByServiceCategory);
professionalsRouter.post("/", professionalController.create);
professionalsRouter.put("/:id", professionalController.update);
professionalsRouter.delete("/:id", professionalController.delete);
