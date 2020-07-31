import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const UsersRoutes = Router();

UsersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = createUser.execute({
      name,
      email,
      password
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default UsersRoutes;
