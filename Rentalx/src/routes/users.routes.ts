import { Router } from 'express';
import { UpdateUserAvatarController } from '../modules/accounts/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar", updateUserAvatarUseCase.handle);


export { usersRoutes };


