import { Router } from 'express'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticate)

appointmentsRouter.post('/', AppointmentsController.create)
appointmentsRouter.get('/me', ProviderAppointmentsController.index)

export default appointmentsRouter
