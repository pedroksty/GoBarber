import { getRepository } from 'typeorm';

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

    const user = usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user);

    const finded = await usersRepository.find();
    console.log(finded);
    return user;
  }
}

export default CreateUserService;
