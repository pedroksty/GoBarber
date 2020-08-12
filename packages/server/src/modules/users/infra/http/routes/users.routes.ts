import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const UsersRoutes = Router();
const upload = multer(uploadConfig);

UsersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password
  });

  delete user.password;

  return response.json(user);
});

UsersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });

    delete user.password;

    return response.json(user);
  }
);

export default UsersRoutes;
