import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
){

  const authHeader = request.headers.authorization;

  //const userTokensRepository = new UsersTokensRepository();

  if(!authHeader){
    throw new AppError("Token missing!", 401);    
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token, 
      //auth.secret_refresh_token
      auth.secret_token
      ) as IPayload;
  //"7fc076cf94b177819f802a989ddcb535"

    //const usersRepository = new UsersRepository();

    //const user = await usersRepository.findById(user_id);
    // const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    // if(!user){
    //   throw new AppError("User does not exists!", 401);
    // }

    request.user = {
      id: user_id,
    };

    next();
  } catch(e) {
    throw new AppError("Invalid token!", 401);
  }

}