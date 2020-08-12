import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersREpository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<any> {
    const checkUserExits = await this.usersRepository.findByEmail(email);

    if (checkUserExits) {
      throw new AppError('Email já existente');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    });
    return user;
  }
}

export default CreateUserService;
