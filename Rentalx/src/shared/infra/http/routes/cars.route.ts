import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoute = Router();

const createCarController = new CreateCarController();

carsRoute.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRoute };