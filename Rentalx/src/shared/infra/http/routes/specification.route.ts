import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

// teste middleware
specificationRoute.use(ensureAuthenticated);
specificationRoute.post("/", createSpecificationController.handle);

export { specificationRoute };