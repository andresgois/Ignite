import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailablaCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailablaCarsController";

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailablaCarsController = new ListAvailablaCarsController();

carsRoute.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoute.get("/available", listAvailablaCarsController.handle);

export { carsRoute };