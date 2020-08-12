import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const UsersRoutes = Router();
const upload = multer(uploadConfig);

UsersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

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
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });

    delete user.password;

    return response.json(user);
  }
);

export default UsersRoutes;
