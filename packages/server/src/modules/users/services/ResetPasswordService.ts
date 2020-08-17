import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersREpository';
import IUserTokenRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private usersTokenRepository: IUserTokenRepository
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exits');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exits');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
