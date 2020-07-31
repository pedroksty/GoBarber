import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<any> {
    const usersRepository = getRepository(User);

    const checkUserExits = await usersRepository.findOne({
      where: { email }
    });

    if (checkUserExits) {
      throw new Error('Email já existente');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
