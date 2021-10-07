import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoute } from './specification.route';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoute);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };