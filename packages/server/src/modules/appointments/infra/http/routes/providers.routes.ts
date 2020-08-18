import { Router } from 'express'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProvidersController from '../controllers/ProvidersController'

const providersRouter = Router()

providersRouter.use(ensureAuthenticate)

providersRouter.get('/', ProvidersController.index)

export default providersRouter
