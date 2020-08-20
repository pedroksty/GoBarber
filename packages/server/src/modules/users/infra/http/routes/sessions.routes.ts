import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import SessionsController from '../controllers/SessionsController'

const sessionsRoutes = Router()

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  SessionsController.create
)

export default sessionsRoutes
