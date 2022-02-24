// Adicionar coluna avatar na tabela users
// Rafatorar usuário com coluna avatar
// Configuração upload multer
// Criar regras de negócio do upload

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

// Criar controller
interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ){}

  async execute({user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(user.avatar){
     // await deleteFile(`./tmp/avatar/${user.avatar}`);
     await this.storageProvider.delete(user.avatar, "avatar");
    }
    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };