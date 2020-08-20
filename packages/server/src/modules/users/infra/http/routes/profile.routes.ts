import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'

const ProfileRouter = Router()

ProfileRouter.use(ensureAuthenticate)

ProfileRouter.get('/', ProfileController.show)
ProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  ProfileController.update
)

export default ProfileRouter
