import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {
    // Usuário existe?
    const user = await this.usersRepository.findByEmail(email);
    if(!user){
      throw new Error("Email or Password incorrect!");
    }

    // Senha está correta?
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email or Password incorrect!");
    }

    // Gerar jsonwebtoken
    const token = sign({}, "7fc076cf94b177819f802a989ddcb535", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user,
      token
    };

  }
}

export { AuthenticateUserUseCase }