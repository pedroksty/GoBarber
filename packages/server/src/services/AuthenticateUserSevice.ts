import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('Dados inválidos');
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Dados inválidos');
    }

    const token = sign({}, '8ad969d697a1baae839bab0bcbd03b79', {
      subject: user.id,
      expiresIn: '7d'
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
