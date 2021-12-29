import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../typeorm/entities/UserTokens";


class UsersTokensRepository implements IUsersTokensRepository{

  private repository: Repository<UserTokens>;

  constructor(){
    this.repository = getRepository(UserTokens);
  }
      
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = await this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })
    await this.repository.save(userTokens);
  
    return userTokens;
  }

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    const usersToken = await this.repository.find({
      user_id,
    });
    return usersToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersToken = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

}

export { UsersTokensRepository }