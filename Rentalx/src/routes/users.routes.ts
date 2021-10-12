import { Router } from 'express';
import multer from 'multer';

import { UpdateUserAvatarController } from '../modules/accounts/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarUseCase.handle
);


export { usersRoutes };


