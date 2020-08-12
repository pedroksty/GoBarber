import { Router } from 'express';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserSevice';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoutes;
