import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const UsersRoutes = Router()
const upload = multer(uploadConfig)

UsersRoutes.post('/', UsersController.create)

UsersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  UserAvatarController.update
)

export default UsersRoutes
