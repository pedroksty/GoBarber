import { Router } from 'express';

import appointmentRouter from './appointments.routes';
import usersRouter from './users.routes';

import initialServer from './initialServer.route';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

routes.use('/', initialServer);

export default routes;
