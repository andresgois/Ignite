import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailablaCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailablaCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import uploadConfig from '@config/upload';

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailablaCarsController = new ListAvailablaCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

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
  
  carsRoute.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
  uploadCarImagesController.handle
)

export { carsRoute };