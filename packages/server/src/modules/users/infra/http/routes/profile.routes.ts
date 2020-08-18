import { Router } from 'express'
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'

const ProfileRouter = Router()

ProfileRouter.use(ensureAuthenticate)

ProfileRouter.get('/', ProfileController.show)
ProfileRouter.put('/', ProfileController.update)

export default ProfileRouter
