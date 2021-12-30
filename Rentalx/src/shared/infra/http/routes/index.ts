import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoute } from './cars.route';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationRoute } from './specification.route';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoute);
router.use("/users", usersRoutes);
router.use("/cars", carsRoute);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);


router.use(authenticateRoutes);

export { router };