import { Router } from 'express'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticate)

appointmentsRouter.post('/', AppointmentsController.create)

export default appointmentsRouter
