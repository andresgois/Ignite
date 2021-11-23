import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailablaCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailablaCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailablaCarsController = new ListAvailablaCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoute.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoute.get("/available", listAvailablaCarsController.handle);

carsRoute.post(
  "/specifications/:id", 
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
  );

export { carsRoute };