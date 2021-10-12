

// Adicionar coluna avatar na tabela users
// Rafatorar usuário com coluna avatar
// Configuração upload multer
// Criar regras de negócio do upload

import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

// Criar controller
interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };