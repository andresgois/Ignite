import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationRoute } from './specification.route';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoute);
router.use("/users", usersRoutes);

export { router };