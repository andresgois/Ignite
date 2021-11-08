import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

// teste middleware
specificationRoute.use(ensureAuthenticated);
specificationRoute.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
  );

export { specificationRoute };