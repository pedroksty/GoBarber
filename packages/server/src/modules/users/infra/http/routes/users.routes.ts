import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const UsersRoutes = Router()
const upload = multer(uploadConfig)

UsersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  UsersController.create
)

UsersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  UserAvatarController.update
)

export default UsersRoutes
